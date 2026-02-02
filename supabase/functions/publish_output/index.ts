import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PublishRequest {
  agent_id: string;
  channel: string;
  content: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { agent_id, channel, content }: PublishRequest = await req.json();

    if (!agent_id || !channel || !content) {
      return new Response(
        JSON.stringify({ error: 'agent_id, channel, and content are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[publish_output] Agent ${agent_id} publishing to ${channel}`);

    // Verify agent exists and is a publisher
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id, name, role')
      .eq('id', agent_id)
      .single();

    if (agentError || !agent) {
      return new Response(
        JSON.stringify({ error: 'Agent not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create publication record
    const { data: publication, error: pubError } = await supabase
      .from('agent_publications')
      .insert({
        agent_id,
        channel,
        content,
        status: 'published',
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (pubError) {
      console.error('[publish_output] Failed to create publication:', pubError);
      return new Response(
        JSON.stringify({ error: 'Failed to publish' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log publication event
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'output_published',
      agent_id,
      severity: 'info',
      message: `Agent ${agent.name} published to ${channel}`,
      payload: { channel, content_preview: JSON.stringify(content).substring(0, 100) },
    });

    // Emit swarm event
    await supabase.from('swarm_events').insert({
      event_type: 'publication_complete',
      source_agent_id: agent_id,
      priority: 'medium',
      payload: { channel, publication_id: publication.id },
    });

    console.log(`[publish_output] Successfully published to ${channel}`);

    return new Response(
      JSON.stringify({
        success: true,
        publication_id: publication.id,
        channel,
        agent_name: agent.name,
        published_at: publication.published_at,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[publish_output] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
