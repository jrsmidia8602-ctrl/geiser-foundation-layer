import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DispatchRequest {
  task_type: string;
  description?: string;
  input?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  parent_task_id?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { task_type, description, input = {}, priority = 'medium', parent_task_id }: DispatchRequest = await req.json();

    console.log(`[dispatch_task] Dispatching task: ${task_type}, priority: ${priority}`);

    // 1. Generate unique task ID
    const taskId = `TSK_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    // 2. Find best available agent based on task type
    const roleMapping: Record<string, string> = {
      'plan': 'planner',
      'execute': 'executor',
      'validate': 'validator',
      'optimize': 'optimizer',
      'monitor': 'watchdog',
    };

    const targetRole = roleMapping[task_type] || 'executor';

    // Get available agents with confidence weighting
    const { data: agents, error: agentError } = await supabase
      .from('agents')
      .select('id, name, role, confidence_score, priority')
      .eq('role', targetRole)
      .order('confidence_score', { ascending: false })
      .limit(10);

    let selectedAgent = agents?.[0];

    if (agentError || !selectedAgent) {
      // Fallback to any available executor
      const { data: fallbackAgents } = await supabase
        .from('agents')
        .select('id, name, role, confidence_score, priority')
        .eq('role', 'executor')
        .order('confidence_score', { ascending: false })
        .limit(1);

      selectedAgent = fallbackAgents?.[0];

      if (!selectedAgent) {
        return new Response(
          JSON.stringify({ error: 'No available agents' }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3. Create task record
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert({
        task_id: taskId,
        agent_id: selectedAgent.id,
        parent_task_id: parent_task_id || null,
        task_type,
        description: description || `Task: ${task_type}`,
        state: 'assigned',
        priority,
        input,
      })
      .select()
      .single();

    if (taskError) {
      console.error('[dispatch_task] Failed to create task:', taskError);
      return new Response(
        JSON.stringify({ error: 'Failed to create task' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Log the dispatch event
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'task_dispatched',
      agent_id: selectedAgent.id,
      task_id: task.id,
      severity: 'info',
      message: `Task ${taskId} dispatched to ${selectedAgent.name}`,
      payload: { task_type, priority, agent_role: selectedAgent.role },
    });

    // 5. Create swarm event for the agent
    await supabase.from('swarm_events').insert({
      event_type: 'task_assigned',
      source_agent_id: null,
      target_agent_id: selectedAgent.id,
      priority,
      payload: { task_id: task.id, task_type, input },
    });

    console.log(`[dispatch_task] Task ${taskId} assigned to ${selectedAgent.name}`);

    return new Response(
      JSON.stringify({
        success: true,
        task_id: taskId,
        assigned_agent: selectedAgent.name,
        agent_role: selectedAgent.role,
        state: 'assigned',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[dispatch_task] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
