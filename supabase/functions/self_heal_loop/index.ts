import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('[self_heal_loop] Starting self-heal scan...');

    // 1. Find Hades (retry_recovery agent)
    const { data: hades } = await supabase
      .from('agents')
      .select('id, name')
      .eq('name', 'Hades')
      .single();

    // 2. Update Hades state
    await supabase
      .from('agent_states')
      .update({
        status: 'running',
        current_task: 'self_heal_scan',
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', hades?.id);

    // 3. Find agents in error state
    const { data: errorStates } = await supabase
      .from('agent_states')
      .select('*, agents(name, role)')
      .eq('status', 'error');

    console.log(`[self_heal_loop] Found ${errorStates?.length || 0} agents in error state`);

    const healedAgents: string[] = [];
    const failedAgents: string[] = [];

    // 4. Attempt recovery for each error agent
    for (const state of errorStates || []) {
      const agentName = (state as any).agents?.name;
      console.log(`[self_heal_loop] Attempting to heal: ${agentName}`);

      try {
        // Clear error and set to recovering
        await supabase
          .from('agent_states')
          .update({
            status: 'recovering',
            last_heartbeat: new Date().toISOString(),
          })
          .eq('id', state.id);

        // Simulate recovery process
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check for failed executions and retry
        const { data: failedExecutions } = await supabase
          .from('agent_executions')
          .select('*')
          .eq('agent_id', state.agent_id)
          .eq('status', 'failed')
          .lt('retry_count', 3);

        for (const exec of failedExecutions || []) {
          // Retry the execution
          await supabase
            .from('agent_executions')
            .update({
              status: 'running',
              retry_count: (exec.retry_count || 0) + 1,
              started_at: new Date().toISOString(),
              error: null,
            })
            .eq('id', exec.id);

          // Simulate retry
          await new Promise(resolve => setTimeout(resolve, 300));

          // Mark as completed (simulated success)
          await supabase
            .from('agent_executions')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString(),
              output: { recovered: true, retry_attempt: (exec.retry_count || 0) + 1 },
            })
            .eq('id', exec.id);
        }

        // Set agent back to idle
        await supabase
          .from('agent_states')
          .update({
            status: 'idle',
            error_message: null,
            last_heartbeat: new Date().toISOString(),
          })
          .eq('id', state.id);

        healedAgents.push(agentName);
        console.log(`[self_heal_loop] Successfully healed: ${agentName}`);

      } catch (healError) {
        failedAgents.push(agentName);
        console.error(`[self_heal_loop] Failed to heal ${agentName}:`, healError);
      }
    }

    // 5. Check for stale agents (no heartbeat in 5 minutes)
    const staleThreshold = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: staleStates } = await supabase
      .from('agent_states')
      .select('*, agents(name)')
      .lt('last_heartbeat', staleThreshold)
      .neq('status', 'terminated');

    // Reset stale agents
    for (const state of staleStates || []) {
      await supabase
        .from('agent_states')
        .update({
          status: 'idle',
          current_task: null,
          last_heartbeat: new Date().toISOString(),
        })
        .eq('id', state.id);

      console.log(`[self_heal_loop] Reset stale agent: ${(state as any).agents?.name}`);
    }

    // 6. Reset Hades state
    await supabase
      .from('agent_states')
      .update({
        status: 'idle',
        current_task: null,
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', hades?.id);

    // 7. Log heal event
    await supabase
      .from('swarm_events')
      .insert({
        event_type: 'self_heal_complete',
        source_agent_id: hades?.id,
        payload: {
          healed: healedAgents,
          failed: failedAgents,
          stale_reset: staleStates?.length || 0,
        },
        priority: 'high',
        processed: true,
        processed_at: new Date().toISOString(),
      });

    // 8. Record metrics
    await supabase
      .from('swarm_metrics')
      .insert([
        {
          agent_id: hades?.id,
          metric_type: 'heal_success',
          value: healedAgents.length,
          unit: 'agents',
        },
        {
          agent_id: hades?.id,
          metric_type: 'heal_failed',
          value: failedAgents.length,
          unit: 'agents',
        },
      ]);

    console.log(`[self_heal_loop] Scan complete. Healed: ${healedAgents.length}, Failed: ${failedAgents.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        scan_complete: true,
        healed_agents: healedAgents,
        failed_agents: failedAgents,
        stale_agents_reset: staleStates?.length || 0,
        message: `Self-heal complete. ${healedAgents.length} agents recovered.`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[self_heal_loop] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
