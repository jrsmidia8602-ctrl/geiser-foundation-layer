import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DispatchRequest {
  event_type: string;
  target_agent?: string;
  target_role?: string;
  payload?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const request: DispatchRequest = await req.json();
    const { event_type, target_agent, target_role, payload = {}, priority = 'medium' } = request;

    console.log(`[agent_dispatcher] Dispatching event: ${event_type}`);

    // 1. Find the orchestrator (Atlas) as source
    const { data: orchestrator } = await supabase
      .from('agents')
      .select('id, name')
      .eq('role', 'orchestrator')
      .single();

    // 2. Find target agent(s)
    let targetAgentId: string | null = null;
    let targetAgentName: string | null = null;

    if (target_agent) {
      const { data: agent } = await supabase
        .from('agents')
        .select('id, name')
        .eq('name', target_agent)
        .single();
      
      if (agent) {
        targetAgentId = agent.id;
        targetAgentName = agent.name;
      }
    } else if (target_role) {
      // Find an available agent with the specified role
      const { data: agents } = await supabase
        .from('agent_states')
        .select('agent_id, agents(id, name, role)')
        .eq('status', 'idle')
        .order('agents(priority)', { ascending: false });

      const availableAgent = agents?.find((a: any) => a.agents?.role === target_role);
      if (availableAgent) {
        targetAgentId = availableAgent.agent_id;
        targetAgentName = (availableAgent as any).agents?.name;
      }
    }

    // 3. Create the event
    const { data: event, error: eventError } = await supabase
      .from('swarm_events')
      .insert({
        event_type,
        source_agent_id: orchestrator?.id,
        target_agent_id: targetAgentId,
        payload: {
          ...payload,
          dispatched_at: new Date().toISOString(),
        },
        priority,
        processed: false,
      })
      .select()
      .single();

    if (eventError) {
      throw new Error(`Failed to create event: ${eventError.message}`);
    }

    console.log(`[agent_dispatcher] Event created: ${event.id}`);

    // 4. If target agent found, update its state to running
    if (targetAgentId) {
      await supabase
        .from('agent_states')
        .update({
          status: 'running',
          current_task: event_type,
          last_heartbeat: new Date().toISOString(),
        })
        .eq('agent_id', targetAgentId);

      // Create execution record
      const { data: execution } = await supabase
        .from('agent_executions')
        .insert({
          agent_id: targetAgentId,
          task_type: event_type,
          input: payload,
          status: 'running',
        })
        .select()
        .single();

      // Simulate task execution (in production, this would trigger actual agent logic)
      const startTime = Date.now();
      
      // Background processing simulation
      setTimeout(async () => {
        const latency = Date.now() - startTime;
        
        // Complete the execution
        await supabase
          .from('agent_executions')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            latency_ms: latency,
            output: { result: 'success', processed_by: targetAgentName },
          })
          .eq('id', execution?.id);

        // Reset agent state
        await supabase
          .from('agent_states')
          .update({
            status: 'idle',
            current_task: null,
            last_heartbeat: new Date().toISOString(),
          })
          .eq('agent_id', targetAgentId);

        // Mark event as processed
        await supabase
          .from('swarm_events')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
          })
          .eq('id', event.id);

        // Record metric
        await supabase
          .from('swarm_metrics')
          .insert({
            agent_id: targetAgentId,
            metric_type: 'execution_latency',
            value: latency,
            unit: 'ms',
            tags: { event_type, priority },
          });
      }, Math.random() * 1000 + 500);

      console.log(`[agent_dispatcher] Task dispatched to ${targetAgentName}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        event_id: event.id,
        dispatched_to: targetAgentName || 'queued',
        priority,
        message: targetAgentId 
          ? `Event dispatched to ${targetAgentName}` 
          : 'Event queued for processing',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[agent_dispatcher] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
