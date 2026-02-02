import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EventIngestRequest {
  source: 'agent' | 'edge' | 'external' | 'system';
  event_type: string;
  payload?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  source_agent_id?: string;
  target_agent_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { 
      source, 
      event_type, 
      payload = {}, 
      priority = 'medium',
      source_agent_id,
      target_agent_id,
    }: EventIngestRequest = await req.json();

    if (!source || !event_type) {
      return new Response(
        JSON.stringify({ error: 'source and event_type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[event_ingest] Ingesting event: ${event_type} from ${source}`);

    const eventId = `EVT_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

    // Insert event into event mesh
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        event_id: eventId,
        source,
        event_type,
        source_agent_id: source_agent_id || null,
        target_agent_id: target_agent_id || null,
        payload,
        priority,
        processed: false,
      })
      .select()
      .single();

    if (eventError) {
      console.error('[event_ingest] Failed to insert event:', eventError);
      return new Response(
        JSON.stringify({ error: 'Failed to ingest event' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For high priority events, trigger immediate processing
    if (priority === 'high' || priority === 'critical') {
      // Call agent_selector to find best agent
      const { data: selectorResult } = await supabase.functions.invoke('agent_selector', {
        body: { event_id: eventId, event_type, payload },
      });

      if (selectorResult?.agent_id) {
        console.log(`[event_ingest] High priority event routed to agent ${selectorResult.agent_name}`);
      }
    }

    // Log to swarm_logs
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'event_ingested',
      severity: priority === 'critical' ? 'warn' : 'info',
      message: `Event ${eventId} ingested from ${source}`,
      payload: { event_type, priority, source },
    });

    return new Response(
      JSON.stringify({
        success: true,
        event_id: eventId,
        source,
        event_type,
        priority,
        queued: true,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[event_ingest] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
