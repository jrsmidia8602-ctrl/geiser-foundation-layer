import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExecuteRequest {
  task_id: string;
  agent_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { task_id, agent_id }: ExecuteRequest = await req.json();

    console.log(`[execute_agent] Executing task: ${task_id}`);

    // 1. Get task details
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*, agents(id, name, role, config)')
      .eq('task_id', task_id)
      .single();

    if (taskError || !task) {
      return new Response(
        JSON.stringify({ error: 'Task not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const startTime = Date.now();

    // 2. Update task state to running
    await supabase
      .from('tasks')
      .update({ state: 'running', started_at: new Date().toISOString() })
      .eq('id', task.id);

    // 3. Update agent state
    await supabase
      .from('agent_states')
      .update({
        status: 'running',
        current_task: task_id,
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', task.agent_id);

    // 4. Log execution start
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'execution_started',
      agent_id: task.agent_id,
      task_id: task.id,
      severity: 'info',
      message: `Agent started executing task ${task_id}`,
      payload: { task_type: task.task_type, input: task.input },
    });

    // 5. Simulate task execution based on task type
    let output: Record<string, unknown> = {};
    let success = true;
    let confidence = 0.95;

    try {
      switch (task.task_type) {
        case 'plan':
          output = {
            subtasks: [
              { type: 'execute', description: 'Step 1: Initialize' },
              { type: 'execute', description: 'Step 2: Process' },
              { type: 'validate', description: 'Step 3: Verify' },
            ],
            estimated_time_ms: 5000,
          };
          break;

        case 'execute':
          output = {
            result: 'Task executed successfully',
            processed_items: Math.floor(Math.random() * 100) + 1,
            metrics: {
              cpu_usage: Math.random() * 50,
              memory_mb: Math.floor(Math.random() * 256),
            },
          };
          break;

        case 'validate':
          const validationScore = Math.random() * 0.3 + 0.7; // 0.7-1.0
          output = {
            valid: validationScore > 0.8,
            score: validationScore,
            checks_passed: Math.floor(validationScore * 10),
            checks_total: 10,
          };
          confidence = validationScore;
          break;

        case 'optimize':
          output = {
            improvements: [
              { area: 'latency', reduction: '15%' },
              { area: 'cost', reduction: '8%' },
            ],
            new_config: { batch_size: 50, timeout_ms: 3000 },
          };
          break;

        case 'monitor':
          output = {
            health: 'healthy',
            alerts: [],
            metrics: {
              uptime: '99.9%',
              active_agents: 50,
              tasks_per_minute: Math.floor(Math.random() * 100),
            },
          };
          break;

        default:
          output = {
            result: 'Generic task completed',
            input_received: task.input,
          };
      }
    } catch (execError) {
      success = false;
      output = { error: execError instanceof Error ? execError.message : 'Execution failed' };
    }

    const latencyMs = Date.now() - startTime;

    // 6. Update task with results
    await supabase
      .from('tasks')
      .update({
        state: success ? 'done' : 'failed',
        output,
        confidence_score: confidence,
        completed_at: new Date().toISOString(),
        error: success ? null : JSON.stringify(output),
      })
      .eq('id', task.id);

    // 7. Update agent state back to idle
    await supabase
      .from('agent_states')
      .update({
        status: 'idle',
        current_task: null,
        last_heartbeat: new Date().toISOString(),
        metrics: { last_latency_ms: latencyMs, last_confidence: confidence },
      })
      .eq('agent_id', task.agent_id);

    // 8. Record execution metrics
    await supabase.from('agent_executions').insert({
      agent_id: task.agent_id,
      task_type: task.task_type,
      status: success ? 'completed' : 'failed',
      input: task.input,
      output,
      started_at: task.started_at,
      completed_at: new Date().toISOString(),
      latency_ms: latencyMs,
      cost: latencyMs * 0.0001, // Cost calculation
    });

    // 9. Log completion
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: success ? 'execution_completed' : 'execution_failed',
      agent_id: task.agent_id,
      task_id: task.id,
      severity: success ? 'info' : 'error',
      message: `Task ${task_id} ${success ? 'completed' : 'failed'} in ${latencyMs}ms`,
      payload: { latency_ms: latencyMs, confidence, output },
    });

    console.log(`[execute_agent] Task ${task_id} completed in ${latencyMs}ms`);

    return new Response(
      JSON.stringify({
        success,
        task_id,
        state: success ? 'done' : 'failed',
        output,
        latency_ms: latencyMs,
        confidence,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[execute_agent] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
