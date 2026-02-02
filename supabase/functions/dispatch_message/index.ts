import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DispatchMessageRequest {
  lead_id: string
  channel: 'email' | 'whatsapp' | 'in-app' | 'sms'
  content_id?: string
  template?: string
  subject?: string
  body?: string
  cta_url?: string
  schedule_at?: string
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

    const body: DispatchMessageRequest = await req.json()
    const { lead_id, channel, content_id, template, subject, body: messageBody, cta_url, schedule_at } = body

    if (!lead_id || !channel) {
      return new Response(
        JSON.stringify({ error: 'lead_id and channel are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('id, email, name, phone, segment, status')
      .eq('id', lead_id)
      .single()

    if (leadError || !lead) {
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find a nurturer agent
    const { data: nurturers } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'nurturer')
      .order('trust_score', { ascending: false })
      .limit(1)

    const nurturer = nurturers?.[0]

    // Get content if content_id provided
    let contentData = null
    if (content_id) {
      const { data } = await supabase
        .from('content')
        .select('*')
        .eq('id', content_id)
        .single()
      contentData = data
    }

    // Prepare message
    const finalSubject = subject || contentData?.subject || `Hey ${lead.name || 'there'}!`
    const finalBody = messageBody || contentData?.body || 'We have something special for you.'
    const finalCta = cta_url || contentData?.cta_url

    // Personalize message
    const personalizedBody = finalBody
      .replace(/\{\{name\}\}/g, lead.name || 'there')
      .replace(/\{\{email\}\}/g, lead.email)

    // Simulate message dispatch based on channel
    let dispatched = false
    let messageId = crypto.randomUUID()
    let dispatchResult: Record<string, unknown> = {}

    switch (channel) {
      case 'email':
        // In production: integrate with SendGrid, Resend, etc.
        dispatchResult = {
          provider: 'email_service',
          to: lead.email,
          subject: finalSubject,
          preview: personalizedBody.substring(0, 100),
          status: 'queued'
        }
        dispatched = true
        break

      case 'whatsapp':
        // In production: integrate with Twilio, MessageBird, etc.
        if (!lead.phone) {
          return new Response(
            JSON.stringify({ error: 'Lead has no phone number' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        dispatchResult = {
          provider: 'whatsapp_api',
          to: lead.phone,
          template: template || 'default',
          status: 'queued'
        }
        dispatched = true
        break

      case 'in-app':
        // Store as in-app notification
        dispatchResult = {
          type: 'in_app_notification',
          title: finalSubject,
          body: personalizedBody,
          cta: finalCta,
          status: 'delivered'
        }
        dispatched = true
        break

      case 'sms':
        if (!lead.phone) {
          return new Response(
            JSON.stringify({ error: 'Lead has no phone number' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        dispatchResult = {
          provider: 'sms_gateway',
          to: lead.phone,
          preview: personalizedBody.substring(0, 160),
          status: 'queued'
        }
        dispatched = true
        break
    }

    // Record touchpoint
    await supabase
      .from('touchpoints')
      .insert({
        lead_id,
        channel,
        event_type: 'sent',
        content_id: content_id || null,
        metadata: {
          message_id: messageId,
          subject: finalSubject,
          ...dispatchResult
        }
      })

    // Update content stats
    if (content_id && contentData) {
      await supabase
        .from('content')
        .update({ send_count: (contentData.send_count || 0) + 1 })
        .eq('id', content_id)
    }

    // Update lead last activity
    await supabase
      .from('leads')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('id', lead_id)

    // Record agent execution
    if (nurturer) {
      await supabase
        .from('agent_executions')
        .insert({
          agent_id: nurturer.id,
          task_type: 'message_dispatch',
          input: { lead_id, channel, content_id },
          output: { dispatched, message_id: messageId, ...dispatchResult },
          status: 'completed',
          started_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
          latency_ms: Date.now() - startTime
        })
    }

    console.log(`[dispatch_message] ${channel} message sent to lead ${lead_id}`)

    return new Response(
      JSON.stringify({
        success: dispatched,
        message_id: messageId,
        channel,
        lead_id,
        result: dispatchResult,
        dispatched_by: nurturer?.name || 'system',
        latency_ms: Date.now() - startTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[dispatch_message] Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})