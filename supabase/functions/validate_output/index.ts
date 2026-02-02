import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidateRequest {
  task_id: string;
  validation_rules?: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { task_id, validation_rules = {} }: ValidateRequest = await req.json();

    console.log(`[validate_output] Validating task: ${task_id}`);

    // 1. Get task with output
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('task_id', task_id)
      .single();

    if (taskError || !task) {
      return new Response(
        JSON.stringify({ error: 'Task not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (task.state !== 'done') {
      return new Response(
        JSON.stringify({ error: 'Task not completed yet', state: task.state }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Find a validator agent
    const { data: validators } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'validator')
      .order('confidence_score', { ascending: false })
      .limit(1);

    const validatorAgent = validators?.[0];

    // 3. Perform validation checks
    const validationResults: { check: string; passed: boolean; details?: string }[] = [];

    // Check output exists
    validationResults.push({
      check: 'output_exists',
      passed: !!task.output,
      details: task.output ? 'Output present' : 'No output found',
    });

    // Check no error
    validationResults.push({
      check: 'no_error',
      passed: !task.error,
      details: task.error || 'No errors',
    });

    // Check confidence score
    const confidenceThreshold = 0.7;
    validationResults.push({
      check: 'confidence_threshold',
      passed: (task.confidence_score || 0) >= confidenceThreshold,
      details: `Confidence: ${(task.confidence_score || 0).toFixed(2)} (threshold: ${confidenceThreshold})`,
    });

    // Check execution time
    if (task.started_at && task.completed_at) {
      const execTime = new Date(task.completed_at).getTime() - new Date(task.started_at).getTime();
      const maxTime = 30000; // 30 seconds
      validationResults.push({
        check: 'execution_time',
        passed: execTime < maxTime,
        details: `Execution time: ${execTime}ms (max: ${maxTime}ms)`,
      });
    }

    // Custom validation rules
    if (Object.keys(validation_rules).length > 0) {
      const output = task.output as Record<string, unknown>;
      for (const [key, expectedValue] of Object.entries(validation_rules)) {
        validationResults.push({
          check: `custom_${key}`,
          passed: output?.[key] === expectedValue,
          details: `Expected ${key}=${expectedValue}, got ${output?.[key]}`,
        });
      }
    }

    const passed = validationResults.filter(r => r.passed).length;
    const total = validationResults.length;
    const validationScore = passed / total;
    const isValid = validationScore >= 0.8;

    // 4. Log validation
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'validation_completed',
      agent_id: validatorAgent?.id || null,
      task_id: task.id,
      severity: isValid ? 'info' : 'warn',
      message: `Validation ${isValid ? 'passed' : 'failed'}: ${passed}/${total} checks`,
      payload: { results: validationResults, score: validationScore },
    });

    console.log(`[validate_output] Task ${task_id} validation: ${passed}/${total}`);

    return new Response(
      JSON.stringify({
        valid: isValid,
        score: validationScore,
        passed,
        total,
        results: validationResults,
        validated_by: validatorAgent?.name || 'system',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[validate_output] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
