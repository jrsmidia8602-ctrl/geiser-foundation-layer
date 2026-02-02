import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OptimizeRequest {
  time_window_hours?: number;
  target_metric?: 'latency' | 'cost' | 'throughput' | 'all';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { time_window_hours = 24, target_metric = 'all' }: OptimizeRequest = await req.json();

    console.log(`[optimize_flow] Analyzing last ${time_window_hours}h, target: ${target_metric}`);

    const since = new Date(Date.now() - time_window_hours * 60 * 60 * 1000).toISOString();

    // 1. Get execution metrics
    const { data: executions } = await supabase
      .from('agent_executions')
      .select('agent_id, task_type, status, latency_ms, cost')
      .gte('created_at', since);

    // 2. Get agent performance
    const { data: agents } = await supabase
      .from('agents')
      .select('id, name, role, confidence_score, max_parallel');

    // 3. Calculate metrics per agent
    const agentMetrics: Record<string, {
      executions: number;
      successes: number;
      avgLatency: number;
      totalCost: number;
    }> = {};

    for (const exec of executions || []) {
      if (!agentMetrics[exec.agent_id]) {
        agentMetrics[exec.agent_id] = { executions: 0, successes: 0, avgLatency: 0, totalCost: 0 };
      }
      const m = agentMetrics[exec.agent_id];
      m.executions++;
      if (exec.status === 'completed') m.successes++;
      m.avgLatency = (m.avgLatency * (m.executions - 1) + (exec.latency_ms || 0)) / m.executions;
      m.totalCost += exec.cost || 0;
    }

    // 4. Generate optimization recommendations
    const recommendations: { agent_id: string; agent_name: string; action: string; reason: string; priority: string }[] = [];

    for (const agent of agents || []) {
      const metrics = agentMetrics[agent.id];
      if (!metrics) continue;

      const successRate = metrics.successes / metrics.executions;

      // Low success rate -> reduce workload
      if (successRate < 0.8 && metrics.executions > 5) {
        recommendations.push({
          agent_id: agent.id,
          agent_name: agent.name,
          action: 'reduce_parallel',
          reason: `Low success rate: ${(successRate * 100).toFixed(1)}%`,
          priority: 'high',
        });
      }

      // High latency -> optimize config
      if (metrics.avgLatency > 5000) {
        recommendations.push({
          agent_id: agent.id,
          agent_name: agent.name,
          action: 'optimize_config',
          reason: `High avg latency: ${metrics.avgLatency.toFixed(0)}ms`,
          priority: 'medium',
        });
      }

      // High cost -> review pricing
      if (metrics.totalCost > 10) {
        recommendations.push({
          agent_id: agent.id,
          agent_name: agent.name,
          action: 'review_cost',
          reason: `High total cost: $${metrics.totalCost.toFixed(2)}`,
          priority: 'low',
        });
      }

      // Excellent performance -> increase capacity
      if (successRate > 0.95 && metrics.avgLatency < 1000 && metrics.executions > 10) {
        recommendations.push({
          agent_id: agent.id,
          agent_name: agent.name,
          action: 'increase_parallel',
          reason: `Excellent performance: ${(successRate * 100).toFixed(1)}% success, ${metrics.avgLatency.toFixed(0)}ms avg`,
          priority: 'low',
        });
      }
    }

    // 5. Apply automatic optimizations (confidence-weighted)
    const autoApplied: string[] = [];

    for (const rec of recommendations.filter(r => r.priority === 'high')) {
      if (rec.action === 'reduce_parallel') {
        await supabase
          .from('agents')
          .update({ max_parallel: 5, confidence_score: 0.7 })
          .eq('id', rec.agent_id);
        autoApplied.push(`${rec.agent_name}: reduced parallel capacity`);
      }
    }

    // 6. Log optimization run
    const { data: optimizer } = await supabase
      .from('agents')
      .select('id')
      .eq('role', 'optimizer')
      .limit(1)
      .single();

    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'optimization_completed',
      agent_id: optimizer?.id || null,
      severity: 'info',
      message: `Optimization complete: ${recommendations.length} recommendations, ${autoApplied.length} auto-applied`,
      payload: { recommendations, auto_applied: autoApplied },
    });

    // 7. Calculate summary stats
    const totalExecutions = Object.values(agentMetrics).reduce((sum, m) => sum + m.executions, 0);
    const totalSuccesses = Object.values(agentMetrics).reduce((sum, m) => sum + m.successes, 0);
    const avgLatency = Object.values(agentMetrics).reduce((sum, m) => sum + m.avgLatency, 0) / (Object.keys(agentMetrics).length || 1);
    const totalCost = Object.values(agentMetrics).reduce((sum, m) => sum + m.totalCost, 0);

    console.log(`[optimize_flow] Complete: ${recommendations.length} recommendations`);

    return new Response(
      JSON.stringify({
        success: true,
        time_window_hours,
        summary: {
          total_executions: totalExecutions,
          success_rate: totalExecutions > 0 ? (totalSuccesses / totalExecutions * 100).toFixed(1) + '%' : 'N/A',
          avg_latency_ms: avgLatency.toFixed(0),
          total_cost: `$${totalCost.toFixed(2)}`,
        },
        recommendations,
        auto_applied: autoApplied,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[optimize_flow] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
