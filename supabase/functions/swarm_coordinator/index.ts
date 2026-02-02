import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SwarmCoordinatorRequest {
  task_type: string;
  parallel_count?: number;
  input?: Record<string, unknown>;
  timeout_ms?: number;
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
      task_type, 
      parallel_count = 5, 
      input = {},
      timeout_ms = 30000,
    }: SwarmCoordinatorRequest = await req.json();

    console.log(`[swarm_coordinator] Coordinating ${parallel_count} agents for: ${task_type}`);

    const startTime = Date.now();
    const coordinationId = `COORD_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    // 1. Select multiple agents for parallel execution
    const { data: agents, error: agentError } = await supabase
      .from('agents')
      .select('id, name, role, trust_score')
      .eq('role', 'executor')
      .order('trust_score', { ascending: false })
      .limit(parallel_count);

    if (agentError || !agents?.length) {
      return new Response(
        JSON.stringify({ error: 'No agents available for coordination' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Create tasks for each agent
    const taskPromises = agents.map(async (agent, index) => {
      const taskId = `TSK_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 4)}`;
      
      // Create task
      const { data: task } = await supabase
        .from('tasks')
        .insert({
          task_id: taskId,
          agent_id: agent.id,
          task_type,
          description: `Coordinated task ${index + 1}/${parallel_count}`,
          state: 'assigned',
          priority: 'high',
          input: { ...input, coordination_id: coordinationId, batch_index: index },
        })
        .select()
        .single();

      // Update agent state
      await supabase
        .from('agent_states')
        .update({ status: 'running', current_task: taskId })
        .eq('agent_id', agent.id);

      return { agent, task, taskId };
    });

    const assignedTasks = await Promise.all(taskPromises);

    // 3. Execute all agents in parallel
    const executionPromises = assignedTasks.map(async ({ agent, task, taskId }) => {
      const execStart = Date.now();
      
      try {
        // Simulate execution (in real scenario, call execute_agent)
        const output = {
          result: 'success',
          processed_by: agent.name,
          batch_index: (task?.input as any)?.batch_index,
          items_processed: Math.floor(Math.random() * 50) + 10,
        };

        const latencyMs = Date.now() - execStart;

        // Update task
        await supabase
          .from('tasks')
          .update({
            state: 'done',
            output,
            completed_at: new Date().toISOString(),
          })
          .eq('task_id', taskId);

        // Update agent state
        await supabase
          .from('agent_states')
          .update({ status: 'idle', current_task: null })
          .eq('agent_id', agent.id);

        // Record execution
        await supabase.from('agent_executions').insert({
          agent_id: agent.id,
          task_type,
          status: 'completed',
          input: task?.input,
          output,
          latency_ms: latencyMs,
          cost: latencyMs * 0.0001,
        });

        return { agent_name: agent.name, task_id: taskId, success: true, latency_ms: latencyMs, output };
      } catch (err) {
        return { agent_name: agent.name, task_id: taskId, success: false, error: String(err) };
      }
    });

    const results = await Promise.all(executionPromises);
    const totalLatency = Date.now() - startTime;

    // 4. Log coordination event
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'swarm_coordination',
      severity: 'info',
      message: `Coordinated ${parallel_count} agents for ${task_type} in ${totalLatency}ms`,
      payload: { coordination_id: coordinationId, agents_used: agents.length, total_latency: totalLatency },
    });

    // 5. Calculate stats
    const successful = results.filter(r => r.success).length;
    const avgLatency = results.reduce((sum, r) => sum + (r.latency_ms || 0), 0) / results.length;

    console.log(`[swarm_coordinator] Complete: ${successful}/${parallel_count} success, ${totalLatency}ms total`);

    return new Response(
      JSON.stringify({
        success: true,
        coordination_id: coordinationId,
        agents_coordinated: parallel_count,
        successful,
        failed: parallel_count - successful,
        total_latency_ms: totalLatency,
        avg_agent_latency_ms: Math.round(avgLatency),
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[swarm_coordinator] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
