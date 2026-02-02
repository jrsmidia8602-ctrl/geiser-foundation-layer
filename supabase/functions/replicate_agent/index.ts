import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReplicateRequest {
  source_agent_id?: string;
  role: 'planner' | 'executor' | 'validator' | 'optimizer' | 'watchdog' | 'publisher' | 'observer' | 'sentinel' | 'replicator';
  count?: number;
  reason?: string;
}

const MAX_AGENTS = 200;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { source_agent_id, role, count = 1, reason = 'demand' }: ReplicateRequest = await req.json();

    console.log(`[replicate_agent] Replicating ${count} agent(s) with role ${role}`);

    // Check current agent count
    const { count: currentCount } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true });

    if ((currentCount || 0) + count > MAX_AGENTS) {
      return new Response(
        JSON.stringify({ 
          error: 'Maximum agent limit reached', 
          current: currentCount, 
          max: MAX_AGENTS 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get source agent config if provided
    let sourceConfig = {};
    let sourceName = '';
    if (source_agent_id) {
      const { data: sourceAgent } = await supabase
        .from('agents')
        .select('name, config, confidence_score')
        .eq('id', source_agent_id)
        .single();
      
      if (sourceAgent) {
        sourceConfig = sourceAgent.config || {};
        sourceName = sourceAgent.name;
        
        // Increment replication count on source
        await supabase
          .from('agents')
          .update({ replication_count: supabase.rpc('increment_replication') })
          .eq('id', source_agent_id);
      }
    }

    // Role-based confidence scores
    const roleConfidence: Record<string, number> = {
      planner: 0.90,
      executor: 0.85,
      validator: 0.92,
      optimizer: 0.88,
      watchdog: 0.95,
      publisher: 0.87,
      observer: 0.91,
      sentinel: 0.94,
      replicator: 0.89,
    };

    const createdAgents = [];
    const timestamp = Date.now();

    for (let i = 0; i < count; i++) {
      const agentName = source_agent_id 
        ? `${sourceName}_REPLICA_${timestamp}_${i + 1}`
        : `XG_${role.toUpperCase()}_${timestamp}_${i + 1}`;

      // Create replicated agent
      const { data: agent, error: agentError } = await supabase
        .from('agents')
        .insert({
          name: agentName,
          role,
          priority: 'medium',
          config: { ...sourceConfig, replicated: true, reason },
          confidence_score: roleConfidence[role] || 0.85,
          trust_score: 0.9,
          replicated_from: source_agent_id || null,
          rate_limit: 100,
          max_parallel: 10,
          version: '1.0.0',
        })
        .select()
        .single();

      if (agentError) {
        console.error('[replicate_agent] Failed to create agent:', agentError);
        continue;
      }

      // Create agent state
      await supabase.from('agent_states').insert({
        agent_id: agent.id,
        status: 'idle',
        memory: { replicated: true, source: source_agent_id },
        metrics: { executions: 0 },
      });

      createdAgents.push({
        id: agent.id,
        name: agent.name,
        role: agent.role,
      });
    }

    // Log replication event
    await supabase.from('swarm_logs').insert({
      log_id: `LOG_${Date.now()}`,
      event_type: 'agents_replicated',
      agent_id: source_agent_id || null,
      severity: 'info',
      message: `Replicated ${createdAgents.length} agent(s) with role ${role}`,
      payload: { reason, agents_created: createdAgents.map(a => a.name) },
    });

    // Emit swarm event
    await supabase.from('swarm_events').insert({
      event_type: 'swarm_expanded',
      source_agent_id: source_agent_id || null,
      priority: 'high',
      payload: { new_agents: createdAgents.length, role, reason },
    });

    console.log(`[replicate_agent] Created ${createdAgents.length} agent(s)`);

    return new Response(
      JSON.stringify({
        success: true,
        agents_created: createdAgents.length,
        agents: createdAgents,
        total_agents: (currentCount || 0) + createdAgents.length,
        max_agents: MAX_AGENTS,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[replicate_agent] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
