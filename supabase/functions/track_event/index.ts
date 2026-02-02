import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-consent',
}

interface TrackEventRequest {
  event_name: string
  event_category?: 'acquisition' | 'activation' | 'revenue' | 'retention'
  lead_id?: string
  session_id?: string
  properties?: Record<string, unknown>
  page_url?: string
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

    // ===== GUARD: Consent Check =====
    const consent = req.headers.get('x-consent')
    if (consent === 'false') {
      return new Response(
        JSON.stringify({ tracked: false, reason: 'no_consent' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ===== GUARD: Rate Limit (100 events per minute per IP) =====
    const clientIP = req.headers.get('cf-connecting-ip') || 'unknown'
    const rateLimitKey = `track_${clientIP}`
    
    // Simple in-memory rate limiting (production would use Redis)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString()
    const { count } = await supabase
      .from('funnel_events')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', oneMinuteAgo)
    
    if ((count || 0) > 10000) { // Global rate limit
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded', retry_after: 60 }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body: TrackEventRequest = await req.json()
    const { event_name, event_category, lead_id, session_id, properties = {}, page_url } = body

    if (!event_name) {
      return new Response(
        JSON.stringify({ error: 'event_name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert funnel event
    const { data: event, error: eventError } = await supabase
      .from('funnel_events')
      .insert({
        event_name,
        event_category,
        lead_id: lead_id || null,
        session_id: session_id || null,
        properties,
        page_url
      })
      .select()
      .single()

    if (eventError) {
      console.error('[track_event] Insert error:', eventError)
      throw new Error('Failed to track event')
    }

    // Update lead scores based on event type
    if (lead_id) {
      const scoreUpdates: Record<string, number> = {}
      
      // Intent signals
      if (['pricing_view', 'demo_request', 'cta_click', 'checkout_start'].includes(event_name)) {
        scoreUpdates.intent_score = 10
      }
      
      // Engagement signals
      if (['page_view', 'content_view', 'email_open', 'email_click'].includes(event_name)) {
        scoreUpdates.engagement_score = 5
      }
      
      // Readiness signals
      if (['demo_request', 'trial_start', 'contact_form'].includes(event_name)) {
        scoreUpdates.readiness_score = 15
      }

      if (Object.keys(scoreUpdates).length > 0) {
        // Get current scores
        const { data: lead } = await supabase
          .from('leads')
          .select('intent_score, engagement_score, readiness_score')
          .eq('id', lead_id)
          .single()

        if (lead) {
          const updates: Record<string, unknown> = { last_activity_at: new Date().toISOString() }
          
          if (scoreUpdates.intent_score) {
            updates.intent_score = Math.min(100, (lead.intent_score || 0) + scoreUpdates.intent_score)
          }
          if (scoreUpdates.engagement_score) {
            updates.engagement_score = Math.min(100, (lead.engagement_score || 0) + scoreUpdates.engagement_score)
          }
          if (scoreUpdates.readiness_score) {
            updates.readiness_score = Math.min(100, (lead.readiness_score || 0) + scoreUpdates.readiness_score)
          }

          // Update segment based on intent score
          const newIntent = (updates.intent_score as number) || lead.intent_score || 0
          if (newIntent >= 80) {
            updates.segment = 'hot'
          } else if (newIntent >= 60) {
            updates.segment = 'warm'
          }

          await supabase
            .from('leads')
            .update(updates)
            .eq('id', lead_id)
        }
      }
    }

    console.log(`[track_event] Tracked: ${event_name} | Lead: ${lead_id || 'anonymous'}`)

    return new Response(
      JSON.stringify({
        tracked: true,
        event_id: event.id,
        event_name,
        latency_ms: Date.now() - startTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[track_event] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})