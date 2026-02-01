import { Activity, Zap, Workflow, Cpu, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    metric: "api_calls",
    label: "API Calls",
    icon: Zap,
    current: 124578,
    limit: 250000,
    rate: "$0.0001",
  },
  {
    metric: "agent_executions",
    label: "Agent Executions",
    icon: Cpu,
    current: 45231,
    limit: 100000,
    rate: "$0.001",
  },
  {
    metric: "workflow_runs",
    label: "Workflow Runs",
    icon: Workflow,
    current: 8924,
    limit: 25000,
    rate: "$0.005",
  },
  {
    metric: "tokens_processed",
    label: "Tokens Processed",
    icon: MessageSquare,
    current: 2450000,
    limit: 10000000,
    rate: "$0.00001",
  },
];

const recentUsage = [
  { tenant: "Acme Corp", metric: "api_calls", count: 12450, cost: 1.25 },
  { tenant: "TechStart", metric: "workflow_runs", count: 342, cost: 1.71 },
  { tenant: "DataFlow", metric: "tokens_processed", count: 890000, cost: 8.90 },
  { tenant: "AIBuilder", metric: "agent_executions", count: 1245, cost: 1.25 },
];

export function UsageMetering() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Usage Metering</h3>
            <p className="text-xs text-muted-foreground">Real-time per-execution tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Real-time</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((item) => {
          const percentage = (item.current / item.limit) * 100;
          const isHigh = percentage > 80;
          
          return (
            <div
              key={item.metric}
              className="p-3 rounded-xl border border-border hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </div>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-lg font-bold text-foreground">
                  {item.current.toLocaleString()}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  / {item.limit.toLocaleString()}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    isHigh ? "bg-warning" : "bg-gradient-to-r from-primary to-accent"
                  )}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span className="font-mono">{item.rate}/unit</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Usage */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Usage (Top Tenants)</h4>
        <div className="space-y-2">
          {recentUsage.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">{item.tenant}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                  {item.metric.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground">{item.count.toLocaleString()}</span>
                <span className="text-xs font-bold text-success">${item.cost.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
