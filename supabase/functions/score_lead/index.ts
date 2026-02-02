import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScoreLeadRequest {
  lead_id: string
  recalculate?: boolean
}

// Scoring configuration based on FENIX_86_VNA blueprint
const SCORING_CONFIG = {
  intent: {
    signals: {
      pricing_view: 15,
      demo_request: 25,
      cta_click: 10,
      checkout_start: 20,
      trial_start: 20,
      feature_compare: 12,
      case_study_view: 8
    },
    thresholds: { warm: 60, hot: 80 }
  },
  engagement: {
    signals: {
      page_view: 2,
      email_open: 5,
      email_click: 10,
      content_download: 15,
      video_watch: 8,
      webinar_attend: 20
    }
  },
  readiness: {
    signals: {
      email_reply: 25,
      demo_request: 30,
      contact_form: 20,
      phone_call: 25,
      proposal_view: 20
    },
    threshold: 75
  }
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

    const body: ScoreLeadRequest = await req.json()
    const { lead_id, recalculate = false } = body

    if (!lead_id) {
      return new Response(
        JSON.stringify({ error: 'lead_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
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

    // Find a qualifier agent
    const { data: qualifiers } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'qualifier')
      .order('trust_score', { ascending: false })
      .limit(1)

    const qualifier = qualifiers?.[0]

    let intentScore = lead.intent_score || 0
    let engagementScore = lead.engagement_score || 0
    let readinessScore = lead.readiness_score || 0

    // Recalculate from events if requested
    if (recalculate) {
      intentScore = 0
      engagementScore = 0
      readinessScore = 0

      // Get all funnel events for this lead
      const { data: events } = await supabase
        .from('funnel_events')
        .select('event_name')
        .eq('lead_id', lead_id)

      if (events) {
        for (const event of events) {
          const eventName = event.event_name as keyof typeof SCORING_CONFIG.intent.signals
          
          if (SCORING_CONFIG.intent.signals[eventName]) {
            intentScore += SCORING_CONFIG.intent.signals[eventName]
          }
          if (SCORING_CONFIG.engagement.signals[eventName as keyof typeof SCORING_CONFIG.engagement.signals]) {
            engagementScore += SCORING_CONFIG.engagement.signals[eventName as keyof typeof SCORING_CONFIG.engagement.signals]
          }
          if (SCORING_CONFIG.readiness.signals[eventName as keyof typeof SCORING_CONFIG.readiness.signals]) {
            readinessScore += SCORING_CONFIG.readiness.signals[eventName as keyof typeof SCORING_CONFIG.readiness.signals]
          }
        }
      }

      // Get touchpoints
      const { data: touchpoints } = await supabase
        .from('touchpoints')
        .select('event_type, channel')
        .eq('lead_id', lead_id)

      if (touchpoints) {
        for (const tp of touchpoints) {
          if (tp.event_type === 'opened') engagementScore += 5
          if (tp.event_type === 'clicked') engagementScore += 10
          if (tp.event_type === 'replied') readinessScore += 25
        }
      }

      // Cap scores at 100
      intentScore = Math.min(100, intentScore)
      engagementScore = Math.min(100, engagementScore)
      readinessScore = Math.min(100, readinessScore)
    }

    // Determine segment
    let segment = 'cold'
    if (intentScore >= SCORING_CONFIG.intent.thresholds.hot) {
      segment = 'hot'
    } else if (intentScore >= SCORING_CONFIG.intent.thresholds.warm) {
      segment = 'warm'
    }

    // Determine status
    let status = lead.status
    if (readinessScore >= SCORING_CONFIG.readiness.threshold && status === 'nurturing') {
      status = 'qualified'
    } else if (intentScore >= 60 && status === 'new') {
      status = 'nurturing'
    }

    // Identify objections based on behavior patterns
    const objectionTags: string[] = [...(lead.objection_tags || [])]
    
    // Check for price objection signals
    const { count: pricingViews } = await supabase
      .from('funnel_events')
      .select('id', { count: 'exact', head: true })
      .eq('lead_id', lead_id)
      .eq('event_name', 'pricing_view')

    if ((pricingViews || 0) > 3 && !objectionTags.includes('price')) {
      objectionTags.push('price')
    }

    // Update lead
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        intent_score: intentScore,
        engagement_score: engagementScore,
        readiness_score: readinessScore,
        segment,
        status,
        objection_tags: objectionTags,
        updated_at: new Date().toISOString()
      })
      .eq('id', lead_id)

    if (updateError) {
      throw new Error(`Failed to update lead: ${updateError.message}`)
    }

    // Record agent execution
    if (qualifier) {
      await supabase
        .from('agent_executions')
        .insert({
          agent_id: qualifier.id,
          task_type: 'lead_scoring',
          input: { lead_id, recalculate },
          output: { intentScore, engagementScore, readinessScore, segment, status },
          status: 'completed',
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
          latency_ms: Date.now() - startTime
        })
    }

    console.log(`[score_lead] Lead ${lead_id}: Intent=${intentScore}, Segment=${segment}`)

    return new Response(
      JSON.stringify({
        success: true,
        lead_id,
        scores: {
          intent: intentScore,
          engagement: engagementScore,
          readiness: readinessScore
        },
        segment,
        status,
        objection_tags: objectionTags,
        thresholds: {
          warm: SCORING_CONFIG.intent.thresholds.warm,
          hot: SCORING_CONFIG.intent.thresholds.hot,
          ready: SCORING_CONFIG.readiness.threshold
        },
        scored_by: qualifier?.name || 'system',
        latency_ms: Date.now() - startTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[score_lead] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})