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

    console.log('[self_health_monitor] Starting health monitoring cycle');

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000).toISOString();

    const issues: { type: string; agent_id?: string; agent_name?: string; action: string }[] = [];
    const recoveries: string[] = [];

    // 1. Find stuck agents (running for too long without heartbeat)
    const { data: stuckAgents } = await supabase
      .from('agent_states')
      .select('id, agent_id, status, current_task, last_heartbeat, agents(name)')
      .eq('status', 'running')
      .lt('last_heartbeat', fiveMinutesAgo);

    for (const state of stuckAgents || []) {
      const agentName = (state as any).agents?.name || 'Unknown';
      
      // Reset stuck agent
      await supabase
        .from('agent_states')
        .update({
          status: 'idle',
          current_task: null,
          error_message: 'Reset by health monitor - stuck',
          last_heartbeat: now.toISOString(),
        })
        .eq('id', state.id);

      // Cancel stuck task
      if (state.current_task) {
        await supabase
          .from('tasks')
          .update({ state: 'failed', error: 'Agent stuck - reset by health monitor' })
          .eq('task_id', state.current_task);
      }

      issues.push({ type: 'stuck_agent', agent_id: state.agent_id, agent_name: agentName, action: 'reset' });
      recoveries.push(`Reset stuck agent: ${agentName}`);
    }

    // 2. Find agents in error state
    const { data: errorAgents } = await supabase
      .from('agent_states')
      .select('id, agent_id, error_message, agents(name, role)')
      .eq('status', 'error');

    for (const state of errorAgents || []) {
      const agentName = (state as any).agents?.name || 'Unknown';
      
      // Attempt recovery
      await supabase
        .from('agent_states')
        .update({
          status: 'idle',
          error_message: null,
          last_heartbeat: now.toISOString(),
        })
        .eq('id', state.id);

      // Decrease trust score for failing agents
      await supabase
        .from('agents')
        .update({ trust_score: 0.8 })
        .eq('id', state.agent_id);

      issues.push({ type: 'error_agent', agent_id: state.agent_id, agent_name: agentName, action: 'recovered' });
      recoveries.push(`Recovered error agent: ${agentName}`);
    }

    // 3. Clean up expired short-term memory
    const { data: expiredData } = await supabase
      .from('agent_memory')
      .delete()
      .eq('memory_type', 'short')
      .lt('expires_at', now.toISOString())
      .select();
    
    const expiredMemory = expiredData?.length || 0;

    if (expiredMemory && expiredMemory > 0) {
      recoveries.push(`Cleaned ${expiredMemory} expired memory entries`);
    }

    // 4. Process stale events
    const { data: staleEvents } = await supabase
      .from('events')
      .select('id, event_id, event_type, retry_count')
      .eq('processed', false)
      .lt('created_at', fiveMinutesAgo)
      .limit(10);

    for (const event of staleEvents || []) {
      if ((event.retry_count || 0) >= 3) {
        // Mark as failed after 3 retries
        await supabase
          .from('events')
          .update({ processed: true, result: { error: 'Max retries exceeded' } })
          .eq('id', event.id);
        issues.push({ type: 'stale_event', action: 'marked_failed' });
      } else {
        // Retry
        await supabase
          .from('events')
          .update({ retry_count: (event.retry_count || 0) + 1 })
          .eq('id', event.id);
      }
    }

    // 5. Check swarm health metrics
    const { count: totalAgents } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true });

    const { count: idleAgents } = await supabase
      .from('agent_states')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'idle');

    const { count: recentExecutions } = await supabase
      .from('agent_executions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneMinuteAgo);

    // Calculate health score
    const idleRatio = (idleAgents || 0) / (totalAgents || 1);
    const errorRatio = (errorAgents?.length || 0) / (totalAgents || 1);
    let healthScore = 100;
    healthScore -= errorRatio * 30;
    healthScore -= (stuckAgents?.length || 0) * 5;
    healthScore -= (staleEvents?.length || 0) * 2;
    healthScore = Math.max(0, Math.round(healthScore));

    // 6. Log health monitoring result
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'health_monitor_cycle',
      severity: healthScore < 80 ? 'warn' : 'info',
      message: `Health monitor complete: ${issues.length} issues, ${recoveries.length} recoveries`,
      payload: { 
        health_score: healthScore, 
        issues_found: issues.length, 
        recoveries_performed: recoveries.length,
        agents_total: totalAgents,
        agents_idle: idleAgents,
        executions_last_minute: recentExecutions,
      },
    });

    console.log(`[self_health_monitor] Complete: health=${healthScore}%, issues=${issues.length}, recoveries=${recoveries.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        health_score: healthScore,
        timestamp: now.toISOString(),
        metrics: {
          total_agents: totalAgents || 0,
          idle_agents: idleAgents || 0,
          error_agents: errorAgents?.length || 0,
          stuck_agents: stuckAgents?.length || 0,
          stale_events: staleEvents?.length || 0,
          executions_per_minute: recentExecutions || 0,
        },
        issues,
        recoveries,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[self_health_monitor] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
