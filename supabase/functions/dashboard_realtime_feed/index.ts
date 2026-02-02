import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DashboardMetrics {
  revenue: {
    total: number;
    today: number;
    transactions: number;
  };
  customers: {
    total: number;
    active: number;
    newToday: number;
  };
  agents: {
    total: number;
    activeExecutions: number;
    topAgent: string;
  };
  usage: {
    totalRequests: number;
    avgResponseTime: number;
    requestsToday: number;
  };
  licenses: {
    total: number;
    active: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split('T')[0];

    console.log('[dashboard_realtime_feed] Fetching metrics...');

    // Fetch all metrics in parallel
    const [
      { data: transactions },
      { data: customers },
      { data: products },
      { data: usage },
      { data: licenses }
    ] = await Promise.all([
      supabase.from('transactions').select('amount, status, created_at').eq('status', 'completed'),
      supabase.from('customers').select('status, created_at'),
      supabase.from('products').select('agent_name').eq('active', true),
      supabase.from('usage').select('requests, response_time_ms, created_at'),
      supabase.from('licenses').select('status')
    ]);

    // Calculate revenue metrics
    const totalRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0;
    const todayTx = transactions?.filter(tx => tx.created_at?.startsWith(today)) || [];
    const todayRevenue = todayTx.reduce((sum, tx) => sum + Number(tx.amount), 0);

    // Calculate customer metrics
    const totalCustomers = customers?.length || 0;
    const activeCustomers = customers?.filter(c => c.status === 'active').length || 0;
    const newToday = customers?.filter(c => c.created_at?.startsWith(today)).length || 0;

    // Calculate usage metrics
    const totalRequests = usage?.reduce((sum, u) => sum + (u.requests || 1), 0) || 0;
    const validResponseTimes = usage?.filter(u => u.response_time_ms) || [];
    const avgResponseTime = validResponseTimes.length > 0
      ? Math.round(validResponseTimes.reduce((sum, u) => sum + u.response_time_ms!, 0) / validResponseTimes.length)
      : 0;
    const requestsToday = usage?.filter(u => u.created_at?.startsWith(today))
      .reduce((sum, u) => sum + (u.requests || 1), 0) || 0;

    // Calculate license metrics
    const totalLicenses = licenses?.length || 0;
    const activeLicenses = licenses?.filter(l => l.status === 'active').length || 0;

    const metrics: DashboardMetrics = {
      revenue: {
        total: totalRevenue,
        today: todayRevenue,
        transactions: transactions?.length || 0,
      },
      customers: {
        total: totalCustomers,
        active: activeCustomers,
        newToday,
      },
      agents: {
        total: products?.length || 0,
        activeExecutions: totalRequests,
        topAgent: 'Hydra',
      },
      usage: {
        totalRequests,
        avgResponseTime,
        requestsToday,
      },
      licenses: {
        total: totalLicenses,
        active: activeLicenses,
      },
    };

    console.log('[dashboard_realtime_feed] Metrics compiled:', metrics);

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        metrics,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[dashboard_realtime_feed] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
