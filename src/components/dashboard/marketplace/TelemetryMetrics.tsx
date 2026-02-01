import { BarChart3, Zap, Clock, AlertTriangle, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { metric: "calls_per_agent", icon: Zap, value: "847K", description: "Total de chamadas por agente", trend: "+22%", color: "text-primary" },
  { metric: "latency", icon: Clock, value: "32ms", description: "Latência média de execução", trend: "-15%", color: "text-success" },
  { metric: "error_rate", icon: AlertTriangle, value: "0.3%", description: "Taxa de erros global", trend: "-8%", color: "text-accent" },
  { metric: "revenue_per_agent", icon: DollarSign, value: "$2.4K", description: "Receita média por agente", trend: "+18%", color: "text-warning" },
  { metric: "tenant_usage", icon: Users, value: "156", description: "Tenants ativos consumindo", trend: "+12%", color: "text-primary" },
];

const topAgents = [
  { name: "GPT-4 Processor", calls: "124K", revenue: "$4.2K", status: "healthy" },
  { name: "Data Enrichment API", calls: "98K", revenue: "$3.1K", status: "healthy" },
  { name: "Email Automator", calls: "76K", revenue: "$2.8K", status: "warning" },
  { name: "Document Parser", calls: "54K", revenue: "$1.9K", status: "healthy" },
];

export function TelemetryMetrics() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Telemetry & Metrics</h3>
          <p className="text-xs text-muted-foreground">Métricas de performance e consumo</p>
        </div>
        <BarChart3 className="w-5 h-5 text-primary" />
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {metrics.map((item) => (
          <div key={item.metric} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
            <item.icon className={cn("w-5 h-5 mx-auto mb-2", item.color)} />
            <div className="text-lg font-bold text-foreground">{item.value}</div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase">{item.metric.replace(/_/g, " ")}</div>
            <span className={cn(
              "text-[10px]",
              item.trend.startsWith("+") ? "text-success" : item.trend.startsWith("-") && item.metric === "error_rate" ? "text-success" : "text-warning"
            )}>
              {item.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Top Agents */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Top Performing Agents</h4>
        <div className="space-y-2">
          {topAgents.map((agent, index) => (
            <div
              key={agent.name}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <span className="font-medium text-foreground">{agent.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">{agent.calls}</div>
                  <div className="text-[10px] text-muted-foreground">calls</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">{agent.revenue}</div>
                  <div className="text-[10px] text-muted-foreground">revenue</div>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  agent.status === "healthy" ? "bg-success" : "bg-warning"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
