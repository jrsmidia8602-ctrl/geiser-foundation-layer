import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PresentOfferRequest {
  lead_id: string
  force_offer_id?: string
}

// Offer rules from FENIX_86_VNA blueprint
const OFFER_RULES = [
  { condition: { intent_min: 80 }, offer_type: 'direct_offer', priority: 1 },
  { condition: { intent_min: 60 }, offer_type: 'trial', priority: 2 },
  { condition: { intent_min: 40 }, offer_type: 'leadmagnet', priority: 3 },
  { condition: { objection: 'price' }, offer_type: 'payment_plan', priority: 1 },
  { condition: { objection: 'time' }, offer_type: 'trial', priority: 1 },
  { condition: { objection: 'trust' }, offer_type: 'leadmagnet', priority: 1 }
]

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

    const body: PresentOfferRequest = await req.json()
    const { lead_id, force_offer_id } = body

    if (!lead_id) {
      return new Response(
        JSON.stringify({ error: 'lead_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get lead with scores
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

    // Find a closer agent
    const { data: closers } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'closer')
      .order('trust_score', { ascending: false })
      .limit(1)

    const closer = closers?.[0]

    // ===== GUARD: Eligibility Check =====
    // Check if lead has been offered recently (prevent spam)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count: recentOffers } = await supabase
      .from('touchpoints')
      .select('id', { count: 'exact', head: true })
      .eq('lead_id', lead_id)
      .eq('event_type', 'offer_presented')
      .gte('created_at', oneHourAgo)

    if ((recentOffers || 0) >= 3) {
      return new Response(
        JSON.stringify({ 
          eligible: false, 
          reason: 'offer_cooldown',
          retry_after: '1 hour'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let selectedOffer = null
    let matchedRule = null

    // If force_offer_id, use that directly
    if (force_offer_id) {
      const { data } = await supabase
        .from('offers')
        .select('*')
        .eq('id', force_offer_id)
        .eq('active', true)
        .single()
      selectedOffer = data
    } else {
      // Apply offer rules
      const intentScore = lead.intent_score || 0
      const objections = lead.objection_tags || []

      // Find matching rules sorted by priority
      const matchingRules = OFFER_RULES.filter(rule => {
        if (rule.condition.intent_min && intentScore < rule.condition.intent_min) {
          return false
        }
        if (rule.condition.objection && !objections.includes(rule.condition.objection)) {
          return false
        }
        return true
      }).sort((a, b) => a.priority - b.priority)

      if (matchingRules.length > 0) {
        matchedRule = matchingRules[0]
        
        // Get offer of the matched type
        const offerType = matchedRule.offer_type === 'direct_offer' ? 'subscription' : matchedRule.offer_type
        
        const { data: offers } = await supabase
          .from('offers')
          .select('*')
          .eq('type', offerType)
          .eq('active', true)
          .order('priority', { ascending: false })
          .limit(1)

        selectedOffer = offers?.[0]
      }

      // Fallback to any active offer
      if (!selectedOffer) {
        const { data: fallbackOffers } = await supabase
          .from('offers')
          .select('*')
          .eq('active', true)
          .order('priority', { ascending: false })
          .limit(1)

        selectedOffer = fallbackOffers?.[0]
      }
    }

    if (!selectedOffer) {
      return new Response(
        JSON.stringify({ 
          eligible: true,
          offer: null,
          reason: 'no_offers_configured'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get product details if linked
    let product = null
    if (selectedOffer.product_id) {
      const { data } = await supabase
        .from('products')
        .select('name, price, billing_type, description')
        .eq('id', selectedOffer.product_id)
        .single()
      product = data
    }

    // Record offer presentation
    await supabase
      .from('touchpoints')
      .insert({
        lead_id,
        channel: 'web',
        event_type: 'offer_presented',
        offer_id: selectedOffer.id,
        metadata: {
          offer_type: selectedOffer.type,
          matched_rule: matchedRule,
          intent_score: lead.intent_score
        }
      })

    // Track funnel event
    await supabase
      .from('funnel_events')
      .insert({
        lead_id,
        event_name: 'offer_presented',
        event_category: 'revenue',
        properties: {
          offer_id: selectedOffer.id,
          offer_type: selectedOffer.type,
          offer_name: selectedOffer.name
        }
      })

    // Record agent execution
    if (closer) {
      await supabase
        .from('agent_executions')
        .insert({
          agent_id: closer.id,
          task_type: 'offer_presentation',
          input: { lead_id },
          output: { offer_id: selectedOffer.id, matched_rule: matchedRule },
          status: 'completed',
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
          latency_ms: Date.now() - startTime
        })
    }

    console.log(`[present_offer] Presenting ${selectedOffer.type} offer to lead ${lead_id}`)

    return new Response(
      JSON.stringify({
        eligible: true,
        offer: {
          id: selectedOffer.id,
          type: selectedOffer.type,
          name: selectedOffer.name,
          headline: selectedOffer.headline,
          description: selectedOffer.description,
          cta_text: selectedOffer.cta_text,
          discount_percent: selectedOffer.discount_percent,
          trial_days: selectedOffer.trial_days
        },
        product,
        matched_rule: matchedRule ? {
          condition: matchedRule.condition,
          offer_type: matchedRule.offer_type
        } : null,
        lead_context: {
          intent_score: lead.intent_score,
          segment: lead.segment,
          objections: lead.objection_tags
        },
        presented_by: closer?.name || 'system',
        latency_ms: Date.now() - startTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[present_offer] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})