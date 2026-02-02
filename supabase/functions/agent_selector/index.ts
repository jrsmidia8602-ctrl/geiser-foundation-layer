import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AgentSelectorRequest {
  event_id?: string;
  event_type: string;
  payload?: Record<string, unknown>;
  preferred_role?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { event_type, payload = {}, preferred_role, event_id }: AgentSelectorRequest = await req.json();

    console.log(`[agent_selector] Selecting agent for event: ${event_type}`);

    // Map event types to agent roles
    const roleMapping: Record<string, string[]> = {
      'plan': ['planner'],
      'execute': ['executor'],
      'validate': ['validator'],
      'optimize': ['optimizer'],
      'monitor': ['watchdog', 'sentinel'],
      'publish': ['publisher'],
      'observe': ['observer'],
      'alert': ['sentinel', 'watchdog'],
      'replicate': ['executor', 'planner'],
    };

    // Determine target roles
    let targetRoles = roleMapping[event_type] || ['executor'];
    if (preferred_role) {
      targetRoles = [preferred_role];
    }

    // Get available agents with highest trust/confidence scores
    const { data: agents, error: agentError } = await supabase
      .from('agents')
      .select(`
        id, name, role, priority, confidence_score, trust_score,
        agent_states(status, current_task)
      `)
      .in('role', targetRoles)
      .order('trust_score', { ascending: false })
      .order('confidence_score', { ascending: false })
      .limit(10);

    if (agentError || !agents?.length) {
      // Fallback to any available agent
      const { data: fallback } = await supabase
        .from('agents')
        .select('id, name, role, priority, confidence_score, trust_score')
        .order('trust_score', { ascending: false })
        .limit(1);

      if (!fallback?.length) {
        return new Response(
          JSON.stringify({ error: 'No agents available' }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const selected = fallback[0];
      return new Response(
        JSON.stringify({
          agent_id: selected.id,
          agent_name: selected.name,
          role: selected.role,
          trust_score: selected.trust_score,
          selection_reason: 'fallback',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select best agent (prefer idle agents with high trust)
    let selectedAgent = agents[0];
    for (const agent of agents) {
      const state = (agent as any).agent_states?.[0];
      if (state?.status === 'idle' && !state?.current_task) {
        selectedAgent = agent;
        break;
      }
    }

    // Update event with selected agent if event_id provided
    if (event_id) {
      await supabase
        .from('events')
        .update({ target_agent_id: selectedAgent.id })
        .eq('event_id', event_id);
    }

    console.log(`[agent_selector] Selected: ${selectedAgent.name} (trust: ${selectedAgent.trust_score})`);

    return new Response(
      JSON.stringify({
        agent_id: selectedAgent.id,
        agent_name: selectedAgent.name,
        role: selectedAgent.role,
        trust_score: selectedAgent.trust_score,
        confidence_score: selectedAgent.confidence_score,
        selection_reason: 'best_match',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[agent_selector] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
