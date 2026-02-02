import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RecordOrderRequest {
  lead_id: string
  offer_id?: string
  product_id?: string
  amount: number
  currency?: string
  payment_method?: string
  stripe_payment_id?: string
  metadata?: Record<string, unknown>
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const startTime = Date.now()

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body: RecordOrderRequest = await req.json()
    const { 
      lead_id, 
      offer_id, 
      product_id, 
      amount, 
      currency = 'USD',
      payment_method,
      stripe_payment_id,
      metadata = {}
    } = body

    if (!lead_id || amount === undefined) {
      return new Response(
        JSON.stringify({ error: 'lead_id and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ===== GUARD: Payment Status Verification =====
    // In production, verify payment with Stripe before recording
    if (stripe_payment_id) {
      // TODO: Verify payment with Stripe API
      // const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'))
      // const payment = await stripe.paymentIntents.retrieve(stripe_payment_id)
      // if (payment.status !== 'succeeded') { return error }
      console.log(`[record_order] Payment verification for ${stripe_payment_id}`)
    }

    // Get lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single()

    if (leadError || !lead) {
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get or create customer
    let customer = null
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', lead.email)
      .single()

    if (existingCustomer) {
      customer = existingCustomer
    } else {
      const { data: newCustomer, error: custError } = await supabase
        .from('customers')
        .insert({
          email: lead.email,
          status: 'active'
        })
        .select()
        .single()

      if (custError) {
        throw new Error(`Failed to create customer: ${custError.message}`)
      }
      customer = newCustomer
    }

    // Get offer details for discount calculation
    let discount = 0
    if (offer_id) {
      const { data: offer } = await supabase
        .from('offers')
        .select('discount_percent')
        .eq('id', offer_id)
        .single()
      
      if (offer?.discount_percent) {
        discount = amount * (offer.discount_percent / 100)
      }
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        lead_id,
        customer_id: customer.id,
        offer_id: offer_id || null,
        product_id: product_id || null,
        order_number: orderNumber,
        status: stripe_payment_id ? 'paid' : 'pending',
        subtotal: amount,
        discount,
        total: amount - discount,
        currency,
        payment_method,
        stripe_payment_id,
        paid_at: stripe_payment_id ? new Date().toISOString() : null,
        metadata
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Update lead status to customer
    await supabase
      .from('leads')
      .update({
        status: 'customer',
        segment: 'customer',
        converted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', lead_id)

    // Create subscription if product is subscription-based
    if (product_id) {
      const { data: product } = await supabase
        .from('products')
        .select('billing_type, price, name')
        .eq('id', product_id)
        .single()

      if (product?.billing_type === 'subscription') {
        await supabase
          .from('subscriptions')
          .insert({
            customer_id: customer.id,
            product_id,
            plan: amount >= 99 ? 'enterprise' : (amount >= 49 ? 'pro' : 'free'),
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            mrr: amount
          })
      }
    }

    // Record touchpoint
    await supabase
      .from('touchpoints')
      .insert({
        lead_id,
        channel: 'web',
        event_type: 'purchased',
        offer_id: offer_id || null,
        metadata: {
          order_id: order.id,
          order_number: orderNumber,
          amount: order.total
        }
      })

    // Track funnel event
    await supabase
      .from('funnel_events')
      .insert({
        lead_id,
        event_name: 'order_completed',
        event_category: 'revenue',
        properties: {
          order_id: order.id,
          amount: order.total,
          currency
        }
      })

    // Emit order event for retention agent
    await supabase
      .from('events')
      .insert({
        event_id: `order_${order.id}`,
        event_type: 'order.completed',
        source: 'record_order',
        payload: {
          order_id: order.id,
          customer_id: customer.id,
          amount: order.total
        }
      })

    console.log(`[record_order] Order ${orderNumber} recorded for lead ${lead_id}: $${order.total}`)

    return new Response(
      JSON.stringify({
        success: true,
        order: {
          id: order.id,
          order_number: orderNumber,
          status: order.status,
          subtotal: order.subtotal,
          discount: order.discount,
          total: order.total,
          currency
        },
        customer: {
          id: customer.id,
          email: customer.email
        },
        lead_converted: true,
        latency_ms: Date.now() - startTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[record_order] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})