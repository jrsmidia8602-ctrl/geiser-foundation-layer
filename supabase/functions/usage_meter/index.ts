import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-license-key',
};

interface UsageRequest {
  license_key?: string;
  endpoint?: string;
  requests?: number;
  response_time_ms?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Support both header and body for license key
    const licenseKeyHeader = req.headers.get('x-license-key');
    const body: UsageRequest = req.method === 'GET' ? {} : await req.json();
    const licenseKey = licenseKeyHeader || body.license_key;

    if (!licenseKey) {
      return new Response(
        JSON.stringify({ error: 'License key required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[usage_meter] Processing request for license: ${licenseKey.substring(0, 10)}...`);

    // Validate license
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .select('*, products(*)')
      .eq('license_key', licenseKey)
      .single();

    if (licenseError || !license) {
      console.error('[usage_meter] Invalid license:', licenseError);
      return new Response(
        JSON.stringify({ error: 'Invalid license key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check license status
    if (license.status !== 'active') {
      return new Response(
        JSON.stringify({ error: 'License is not active', status: license.status }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check expiration
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      await supabase
        .from('licenses')
        .update({ status: 'expired' })
        .eq('id', license.id);

      return new Response(
        JSON.stringify({ error: 'License has expired' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check usage limit
    if (license.usage_limit && license.usage_count >= license.usage_limit) {
      return new Response(
        JSON.stringify({ 
          error: 'Usage limit exceeded',
          usage_count: license.usage_count,
          usage_limit: license.usage_limit
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record usage
    const requestCount = body.requests || 1;
    const { error: usageError } = await supabase
      .from('usage')
      .insert({
        license_id: license.id,
        endpoint: body.endpoint || 'api',
        requests: requestCount,
        response_time_ms: body.response_time_ms
      });

    if (usageError) {
      console.error('[usage_meter] Failed to record usage:', usageError);
    }

    // Increment usage count on license
    const { error: updateError } = await supabase
      .from('licenses')
      .update({ usage_count: (license.usage_count || 0) + requestCount })
      .eq('id', license.id);

    if (updateError) {
      console.error('[usage_meter] Failed to update usage count:', updateError);
    }

    const newUsageCount = (license.usage_count || 0) + requestCount;
    const remainingRequests = license.usage_limit ? license.usage_limit - newUsageCount : null;

    console.log(`[usage_meter] Usage recorded. Total: ${newUsageCount}, Remaining: ${remainingRequests}`);

    return new Response(
      JSON.stringify({
        valid: true,
        license_status: 'active',
        product: license.products?.name,
        agent: license.products?.agent_name,
        usage: {
          current: newUsageCount,
          limit: license.usage_limit,
          remaining: remainingRequests
        },
        expires_at: license.expires_at
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[usage_meter] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
