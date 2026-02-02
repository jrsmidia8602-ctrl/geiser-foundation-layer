import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MemoryWriterRequest {
  agent_id: string;
  memory_type: 'short' | 'long' | 'vector';
  key?: string;
  payload: Record<string, unknown>;
  ttl_seconds?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { agent_id, memory_type, key, payload, ttl_seconds }: MemoryWriterRequest = await req.json();

    if (!agent_id || !memory_type || !payload) {
      return new Response(
        JSON.stringify({ error: 'agent_id, memory_type, and payload are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[memory_writer] Writing ${memory_type} memory for agent ${agent_id}`);

    // Calculate expiration for short-term memory
    let expires_at = null;
    if (memory_type === 'short' && ttl_seconds) {
      expires_at = new Date(Date.now() + ttl_seconds * 1000).toISOString();
    }

    // Check if key exists for upsert
    if (key) {
      const { data: existing } = await supabase
        .from('agent_memory')
        .select('id')
        .eq('agent_id', agent_id)
        .eq('key', key)
        .single();

      if (existing) {
        // Update existing memory
        const { error: updateError } = await supabase
          .from('agent_memory')
          .update({
            payload,
            memory_type,
            ttl_seconds,
            expires_at,
          })
          .eq('id', existing.id);

        if (updateError) {
          return new Response(
            JSON.stringify({ error: 'Failed to update memory' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            action: 'updated',
            memory_id: existing.id,
            key,
            memory_type,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Insert new memory
    const { data: memory, error: memoryError } = await supabase
      .from('agent_memory')
      .insert({
        agent_id,
        memory_type,
        key,
        payload,
        ttl_seconds,
        expires_at,
      })
      .select()
      .single();

    if (memoryError) {
      console.error('[memory_writer] Failed to write memory:', memoryError);
      return new Response(
        JSON.stringify({ error: 'Failed to write memory' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update agent state with memory info
    await supabase
      .from('agent_states')
      .update({
        memory: {
          last_write: new Date().toISOString(),
          memory_type,
          key,
        },
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', agent_id);

    console.log(`[memory_writer] Memory written successfully: ${memory.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        action: 'created',
        memory_id: memory.id,
        key,
        memory_type,
        expires_at,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[memory_writer] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
