import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LicenseRequest {
  customer_id: string;
  product_id: string;
  transaction_id?: string;
  usage_limit?: number;
  expires_days?: number;
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
      customer_id, 
      product_id, 
      transaction_id,
      usage_limit = 10000,
      expires_days = 365 
    }: LicenseRequest = await req.json();

    console.log(`[license_issuer] Generating license for customer: ${customer_id}, product: ${product_id}`);

    // Generate unique license key using database function
    const { data: keyData, error: keyError } = await supabase.rpc('generate_license_key');
    
    if (keyError) {
      console.error('[license_issuer] Failed to generate key:', keyError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate license key' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const licenseKey = keyData;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expires_days);

    // Create license record
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .insert({
        license_key: licenseKey,
        customer_id,
        product_id,
        status: 'active',
        usage_limit,
        usage_count: 0,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (licenseError) {
      console.error('[license_issuer] Failed to create license:', licenseError);
      return new Response(
        JSON.stringify({ error: 'Failed to create license' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update transaction with license_id if provided
    if (transaction_id) {
      await supabase
        .from('transactions')
        .update({ license_id: license.id })
        .eq('id', transaction_id);
    }

    console.log(`[license_issuer] License created successfully: ${licenseKey}`);

    return new Response(
      JSON.stringify({
        success: true,
        license_key: licenseKey,
        expires_at: expiresAt.toISOString(),
        usage_limit,
        status: 'active'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[license_issuer] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
