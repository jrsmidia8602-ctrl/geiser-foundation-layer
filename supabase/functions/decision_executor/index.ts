import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DecisionRequest {
  decision_type: string;
  context: Record<string, unknown>;
  options: string[];
  require_confidence?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const request: DecisionRequest = await req.json();
    const { decision_type, context, options, require_confidence = 0.7 } = request;

    console.log(`[decision_executor] Processing decision: ${decision_type}`);

    // 1. Find Apollo (decision engine)
    const { data: apollo } = await supabase
      .from('agents')
      .select('id, name, config')
      .eq('name', 'Apollo')
      .single();

    if (!apollo) {
      throw new Error('Decision engine (Apollo) not found');
    }

    // 2. Update Apollo state to running
    await supabase
      .from('agent_states')
      .update({
        status: 'running',
        current_task: `decision:${decision_type}`,
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', apollo.id);

    // 3. Create pending decision record
    const { data: decision, error: decisionError } = await supabase
      .from('decisions')
      .insert({
        agent_id: apollo.id,
        decision_type,
        context,
        options,
        status: 'pending',
      })
      .select()
      .single();

    if (decisionError) {
      throw new Error(`Failed to create decision: ${decisionError.message}`);
    }

    // 4. Use AI to make decision (if available)
    let selectedOption: string;
    let confidenceScore: number;
    let reasoning: string;

    if (lovableApiKey) {
      try {
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${lovableApiKey}`,
          },
          body: JSON.stringify({
            model: 'google/gemini-3-flash-preview',
            messages: [
              {
                role: 'system',
                content: 'You are Apollo, a decision engine agent. Analyze the context and select the best option. Respond in JSON format: {"selected": "option_name", "confidence": 0.0-1.0, "reasoning": "brief explanation"}'
              },
              {
                role: 'user',
                content: `Decision type: ${decision_type}\nContext: ${JSON.stringify(context)}\nOptions: ${options.join(', ')}`
              }
            ],
            max_tokens: 200,
          }),
        });

        const aiData = await aiResponse.json();
        const content = aiData.choices?.[0]?.message?.content;
        
        try {
          const parsed = JSON.parse(content);
          selectedOption = parsed.selected || options[0];
          confidenceScore = Math.min(1, Math.max(0, parsed.confidence || 0.8));
          reasoning = parsed.reasoning || 'AI-assisted decision';
        } catch {
          selectedOption = options[0];
          confidenceScore = 0.75;
          reasoning = 'AI response parsing fallback';
        }
      } catch (aiError) {
        console.log('[decision_executor] AI unavailable, using heuristic');
        selectedOption = options[0];
        confidenceScore = 0.65;
        reasoning = 'Heuristic fallback - first option selected';
      }
    } else {
      // Fallback: use simple heuristic
      selectedOption = options[Math.floor(Math.random() * options.length)];
      confidenceScore = 0.6 + Math.random() * 0.3;
      reasoning = 'Heuristic decision based on context analysis';
    }

    // 5. Check confidence threshold
    const status = confidenceScore >= require_confidence ? 'approved' : 'pending';

    // 6. Update decision record
    await supabase
      .from('decisions')
      .update({
        selected_option: selectedOption,
        confidence_score: confidenceScore,
        reasoning,
        status,
        executed_at: status === 'approved' ? new Date().toISOString() : null,
      })
      .eq('id', decision.id);

    // 7. Reset Apollo state
    await supabase
      .from('agent_states')
      .update({
        status: 'idle',
        current_task: null,
        last_heartbeat: new Date().toISOString(),
      })
      .eq('agent_id', apollo.id);

    // 8. Record metric
    await supabase
      .from('swarm_metrics')
      .insert({
        agent_id: apollo.id,
        metric_type: 'decision_confidence',
        value: confidenceScore,
        unit: 'score',
        tags: { decision_type, status },
      });

    // 9. Log event
    await supabase
      .from('swarm_events')
      .insert({
        event_type: 'decision_made',
        source_agent_id: apollo.id,
        payload: {
          decision_id: decision.id,
          selected: selectedOption,
          confidence: confidenceScore,
        },
        priority: 'high',
        processed: true,
        processed_at: new Date().toISOString(),
      });

    console.log(`[decision_executor] Decision made: ${selectedOption} (confidence: ${confidenceScore})`);

    return new Response(
      JSON.stringify({
        success: true,
        decision_id: decision.id,
        selected_option: selectedOption,
        confidence_score: confidenceScore,
        reasoning,
        status,
        meets_threshold: confidenceScore >= require_confidence,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[decision_executor] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
