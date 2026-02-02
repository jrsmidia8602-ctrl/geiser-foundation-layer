import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateAgentRequest {
  name: string;
  role: 'planner' | 'executor' | 'validator' | 'optimizer' | 'watchdog';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  config?: Record<string, unknown>;
  max_parallel?: number;
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
      name, 
      role, 
      priority = 'medium', 
      config = {},
      max_parallel = 10 
    }: CreateAgentRequest = await req.json();

    // Validate required fields
    if (!name || !role) {
      return new Response(
        JSON.stringify({ error: 'Name and role are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate role
    const validRoles = ['planner', 'executor', 'validator', 'optimizer', 'watchdog'];
    if (!validRoles.includes(role)) {
      return new Response(
        JSON.stringify({ error: `Invalid role. Must be one of: ${validRoles.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[create_agent] Creating agent: ${name}, role: ${role}`);

    // Check if agent with same name exists
    const { data: existing } = await supabase
      .from('agents')
      .select('id')
      .eq('name', name)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Agent with this name already exists' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Set initial confidence based on role
    const roleConfidence: Record<string, number> = {
      planner: 0.90,
      executor: 0.85,
      validator: 0.92,
      optimizer: 0.88,
      watchdog: 0.95,
    };

    // Create agent
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .insert({
        name,
        role,
        priority,
        config,
        max_parallel,
        confidence_score: roleConfidence[role] || 0.85,
        rate_limit: 100,
        version: '1.0.0',
      })
      .select()
      .single();

    if (agentError) {
      console.error('[create_agent] Failed to create agent:', agentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create agent', details: agentError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create initial agent state
    const { error: stateError } = await supabase
      .from('agent_states')
      .insert({
        agent_id: agent.id,
        status: 'idle',
        memory: { initialized: true, created_at: new Date().toISOString() },
        metrics: { executions: 0, success_rate: 0 },
      });

    if (stateError) {
      console.error('[create_agent] Failed to create agent state:', stateError);
    }

    // Log creation event
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'agent_created',
      agent_id: agent.id,
      severity: 'info',
      message: `Agent ${name} created with role ${role}`,
      payload: { name, role, priority, config },
    });

    // Emit swarm event
    await supabase.from('swarm_events').insert({
      event_type: 'agent_joined',
      target_agent_id: agent.id,
      priority: 'medium',
      payload: { agent_name: name, role, ready: true },
    });

    console.log(`[create_agent] Agent ${name} created successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        agent: {
          id: agent.id,
          name: agent.name,
          role: agent.role,
          priority: agent.priority,
          confidence_score: agent.confidence_score,
          status: 'idle',
        },
        message: `Agent ${name} created and ready`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[create_agent] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
