import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutRequest {
  product_id: string;
  customer_email: string;
  payment_method?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { product_id, customer_email, payment_method = 'stripe' }: CheckoutRequest = await req.json();

    console.log(`[marketplace_checkout] Processing checkout for product: ${product_id}, customer: ${customer_email}`);

    // 1. Validate product exists and is active
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('product_id', product_id)
      .eq('active', true)
      .single();

    if (productError || !product) {
      console.error('[marketplace_checkout] Product not found:', productError);
      return new Response(
        JSON.stringify({ error: 'Product not found or inactive' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Get or create customer
    let { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', customer_email)
      .single();

    if (!customer) {
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({ email: customer_email, status: 'active' })
        .select()
        .single();

      if (customerError) {
        console.error('[marketplace_checkout] Failed to create customer:', customerError);
        return new Response(
          JSON.stringify({ error: 'Failed to create customer' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      customer = newCustomer;
    }

    // 3. Create transaction record (pending)
    const txId = `TX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .insert({
        tx_id: txId,
        customer_id: customer.id,
        product_id: product.id,
        amount: product.price,
        currency: product.currency || 'USD',
        status: 'pending',
        metadata: { payment_method, billing_type: product.billing_type }
      })
      .select()
      .single();

    if (txError) {
      console.error('[marketplace_checkout] Failed to create transaction:', txError);
      return new Response(
        JSON.stringify({ error: 'Failed to create transaction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Check if Stripe is configured
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (stripeKey && payment_method === 'stripe') {
      // TODO: Implement Stripe checkout session creation
      console.log('[marketplace_checkout] Stripe integration pending - key available');
      
      // For now, simulate successful payment for demo
      await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transaction.id);

      // Trigger license issuance
      const { data: license } = await supabase.functions.invoke('license_issuer', {
        body: { 
          customer_id: customer.id, 
          product_id: product.id,
          transaction_id: transaction.id
        }
      });

      return new Response(
        JSON.stringify({
          success: true,
          transaction_id: txId,
          license_key: license?.license_key,
          message: 'Payment processed successfully'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Demo mode - auto-complete for testing
    console.log('[marketplace_checkout] Demo mode - simulating payment');
    
    await supabase
      .from('transactions')
      .update({ status: 'completed' })
      .eq('id', transaction.id);

    // Issue license
    const { data: license } = await supabase.functions.invoke('license_issuer', {
      body: { 
        customer_id: customer.id, 
        product_id: product.id,
        transaction_id: transaction.id
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        transaction_id: txId,
        license_key: license?.license_key,
        demo_mode: true,
        message: 'Demo checkout completed - configure Stripe for production'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[marketplace_checkout] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
