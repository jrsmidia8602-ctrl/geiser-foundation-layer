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

    console.log('[health_check] Running swarm health check');

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

    // 1. Count agents by status
    const { data: agentStates } = await supabase
      .from('agent_states')
      .select('status, agent_id');

    const statusCounts: Record<string, number> = {};
    for (const state of agentStates || []) {
      statusCounts[state.status] = (statusCounts[state.status] || 0) + 1;
    }

    // 2. Get total agents
    const { count: totalAgents } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true });

    // 3. Count tasks by state
    const { data: taskStates } = await supabase
      .from('tasks')
      .select('state');

    const taskCounts: Record<string, number> = {};
    for (const task of taskStates || []) {
      taskCounts[task.state] = (taskCounts[task.state] || 0) + 1;
    }

    // 4. Get recent errors
    const { data: recentErrors } = await supabase
      .from('swarm_logs')
      .select('agent_id, message, created_at')
      .in('severity', ['error', 'critical'])
      .gte('created_at', fiveMinutesAgo)
      .order('created_at', { ascending: false })
      .limit(10);

    // 5. Calculate health score
    const activeAgents = statusCounts['running'] || 0;
    const errorAgents = statusCounts['error'] || 0;
    const idleAgents = statusCounts['idle'] || 0;

    const failedTasks = taskCounts['failed'] || 0;
    const completedTasks = taskCounts['done'] || 0;
    const totalTasks = completedTasks + failedTasks;

    let healthScore = 100;

    // Deduct for error agents
    if (totalAgents && errorAgents > 0) {
      healthScore -= (errorAgents / (totalAgents || 1)) * 30;
    }

    // Deduct for failed tasks
    if (totalTasks > 0 && failedTasks / totalTasks > 0.1) {
      healthScore -= (failedTasks / totalTasks) * 20;
    }

    // Deduct for recent errors
    healthScore -= Math.min(recentErrors?.length || 0, 10) * 2;

    healthScore = Math.max(0, Math.round(healthScore));

    // 6. Determine overall status
    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    const alerts: string[] = [];

    if (healthScore < 50) {
      status = 'critical';
      alerts.push('Critical: Health score below 50%');
    } else if (healthScore < 80) {
      status = 'degraded';
      alerts.push('Warning: Health score below 80%');
    }

    if (errorAgents > 0) {
      alerts.push(`${errorAgents} agent(s) in error state`);
    }

    if ((recentErrors?.length || 0) > 5) {
      alerts.push(`${recentErrors?.length} errors in last 5 minutes`);
    }

    // 7. Get throughput metrics
    const { count: recentExecutions } = await supabase
      .from('agent_executions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', fiveMinutesAgo);

    const tasksPerMinute = ((recentExecutions || 0) / 5).toFixed(1);

    // 8. Find watchdog agent
    const { data: watchdog } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'watchdog')
      .limit(1)
      .single();

    // 9. Log health check
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'health_check',
      agent_id: watchdog?.id || null,
      severity: status === 'critical' ? 'error' : status === 'degraded' ? 'warn' : 'info',
      message: `Health check: ${status} (${healthScore}%)`,
      payload: { health_score: healthScore, alerts, status_counts: statusCounts },
    });

    console.log(`[health_check] Status: ${status}, Score: ${healthScore}%`);

    return new Response(
      JSON.stringify({
        status,
        health_score: healthScore,
        timestamp: now.toISOString(),
        agents: {
          total: totalAgents || 0,
          idle: idleAgents,
          running: activeAgents,
          error: errorAgents,
          other: (totalAgents || 0) - idleAgents - activeAgents - errorAgents,
        },
        tasks: {
          pending: taskCounts['pending'] || 0,
          running: taskCounts['running'] || 0,
          completed: completedTasks,
          failed: failedTasks,
        },
        metrics: {
          tasks_per_minute: parseFloat(tasksPerMinute),
          recent_errors: recentErrors?.length || 0,
        },
        alerts,
        checked_by: watchdog?.name || 'system',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[health_check] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        status: 'error',
        health_score: 0,
        error: errorMessage 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
