import { useEffect, useState } from "react";
import { Activity, ArrowUpRight, Zap, Clock, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface SwarmMetrics {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  errorAgents: number;
  totalExecutions: number;
  avgLatency: number;
  successRate: number;
  eventsProcessed: number;
}

export function SwarmStats() {
  const [metrics, setMetrics] = useState<SwarmMetrics>({
    totalAgents: 0,
    activeAgents: 0,
    idleAgents: 0,
    errorAgents: 0,
    totalExecutions: 0,
    avgLatency: 0,
    successRate: 100,
    eventsProcessed: 0,
  });
  const [executionData, setExecutionData] = useState<{ time: string; count: number }[]>([]);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    const [statesRes, executionsRes, eventsRes] = await Promise.all([
      supabase.from('agent_states').select('status'),
      supabase.from('agent_executions').select('status, latency_ms, created_at').order('created_at', { ascending: false }).limit(100),
      supabase.from('swarm_events').select('processed').eq('processed', true),
    ]);

    const states = statesRes.data || [];
    const executions = executionsRes.data || [];
    const events = eventsRes.data || [];

    const completed = executions.filter(e => e.status === 'completed');
    const avgLatency = completed.length > 0
      ? Math.round(completed.reduce((sum, e) => sum + (e.latency_ms || 0), 0) / completed.length)
      : 0;

    setMetrics({
      totalAgents: states.length,
      activeAgents: states.filter(s => s.status === 'running').length,
      idleAgents: states.filter(s => s.status === 'idle').length,
      errorAgents: states.filter(s => s.status === 'error').length,
      totalExecutions: executions.length,
      avgLatency,
      successRate: executions.length > 0
        ? Math.round((completed.length / executions.length) * 100)
        : 100,
      eventsProcessed: events.length,
    });

    // Build execution timeline
    const hourlyData: Record<string, number> = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const key = `${hour.getHours()}:00`;
      hourlyData[key] = 0;
    }
    
    executions.forEach(e => {
      const hour = new Date(e.created_at).getHours();
      const key = `${hour}:00`;
      if (hourlyData[key] !== undefined) {
        hourlyData[key]++;
      }
    });

    setExecutionData(Object.entries(hourlyData).map(([time, count]) => ({ time, count })));
  };

  const statCards = [
    { label: 'Agents Ativos', value: metrics.activeAgents, total: metrics.totalAgents, icon: Activity, color: 'text-primary' },
    { label: 'Taxa Sucesso', value: `${metrics.successRate}%`, icon: ArrowUpRight, color: 'text-success' },
    { label: 'Latência Média', value: `${metrics.avgLatency}ms`, icon: Clock, color: 'text-accent' },
    { label: 'Eventos', value: metrics.eventsProcessed, icon: Zap, color: 'text-warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              {stat.label === 'Agents Ativos' && metrics.errorAgents > 0 && (
                <div className="flex items-center gap-1 text-destructive">
                  <AlertTriangle className="w-3 h-3" />
                  <span className="text-[10px]">{metrics.errorAgents}</span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stat.value}
              {stat.total && (
                <span className="text-sm text-muted-foreground font-normal">/{stat.total}</span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Execution Chart */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-foreground">Execuções (12h)</h3>
            <p className="text-xs text-muted-foreground">{metrics.totalExecutions} total</p>
          </div>
        </div>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={executionData}>
              <defs>
                <linearGradient id="execGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187 100% 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(187 100% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 10%)',
                  border: '1px solid hsl(222 30% 18%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(187 100% 50%)"
                strokeWidth={2}
                fill="url(#execGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
