import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BootstrapConfig {
  mode?: 'initialize' | 'restart' | 'scale';
  target_agents?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const config: BootstrapConfig = req.method === 'POST' ? await req.json() : { mode: 'initialize' };
    const mode = config.mode || 'initialize';

    console.log(`[swarm_bootstrap] Starting swarm in ${mode} mode...`);

    // 1. Get all agents
    const { data: agents, error: agentsError } = await supabase
      .from('agents')
      .select('*')
      .order('priority', { ascending: false });

    if (agentsError) {
      throw new Error(`Failed to fetch agents: ${agentsError.message}`);
    }

    console.log(`[swarm_bootstrap] Found ${agents?.length || 0} agents`);

    // 2. Elect leader (highest priority, prefer orchestrator)
    const leader = agents?.find(a => a.role === 'orchestrator') || agents?.[0];
    
    if (leader) {
      await supabase
        .from('agents')
        .update({ is_leader: true })
        .eq('id', leader.id);

      // Reset other agents' leader status
      await supabase
        .from('agents')
        .update({ is_leader: false })
        .neq('id', leader.id);

      console.log(`[swarm_bootstrap] Leader elected: ${leader.name}`);
    }

    // 3. Initialize or update agent states
    for (const agent of agents || []) {
      const { data: existingState } = await supabase
        .from('agent_states')
        .select('id')
        .eq('agent_id', agent.id)
        .single();

      if (existingState) {
        // Update existing state
        await supabase
          .from('agent_states')
          .update({
            status: 'idle',
            last_heartbeat: new Date().toISOString(),
            error_message: null,
          })
          .eq('agent_id', agent.id);
      } else {
        // Create new state
        await supabase
          .from('agent_states')
          .insert({
            agent_id: agent.id,
            status: 'idle',
            memory: { short_term: {}, long_term: {} },
            metrics: { executions: 0, success_rate: 100, avg_latency_ms: 0 },
          });
      }
    }

    // 4. Log bootstrap event
    await supabase
      .from('swarm_events')
      .insert({
        event_type: 'swarm_bootstrap',
        source_agent_id: leader?.id,
        payload: {
          mode,
          agents_count: agents?.length,
          leader: leader?.name,
          timestamp: new Date().toISOString(),
        },
        priority: 'critical',
        processed: true,
        processed_at: new Date().toISOString(),
      });

    // 5. Get final swarm status
    const { data: states } = await supabase
      .from('agent_states')
      .select('*, agents(name, role, priority)')
      .order('agents(priority)', { ascending: false });

    const swarmStatus = {
      mode,
      leader: leader?.name,
      total_agents: agents?.length || 0,
      agents_ready: states?.filter(s => s.status === 'idle').length || 0,
      agents_running: states?.filter(s => s.status === 'running').length || 0,
      agents_error: states?.filter(s => s.status === 'error').length || 0,
      fault_tolerance: true,
      auto_scaling: {
        enabled: true,
        min: 5,
        max: 50,
        current: agents?.length || 0,
      },
    };

    console.log(`[swarm_bootstrap] Swarm initialized:`, swarmStatus);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Swarm bootstrapped successfully',
        swarm: swarmStatus,
        agents: states?.map(s => ({
          name: s.agents?.name,
          role: s.agents?.role,
          status: s.status,
          last_heartbeat: s.last_heartbeat,
        })),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[swarm_bootstrap] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
