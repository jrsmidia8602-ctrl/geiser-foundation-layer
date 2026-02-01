import { Target, DollarSign, Clock, TrendingUp, Gauge, Cpu, Zap, RefreshCw, Database, Settings } from "lucide-react";

const targets = [
  { name: "cost_reduction", icon: DollarSign, value: "-23%", color: "text-success" },
  { name: "latency", icon: Clock, value: "45ms", color: "text-warning" },
  { name: "conversion_rate", icon: TrendingUp, value: "+8.2%", color: "text-primary" },
  { name: "accuracy", icon: Target, value: "97.3%", color: "text-accent" },
  { name: "resource_utilization", icon: Gauge, value: "78%", color: "text-foreground" },
];

const autoActions = [
  { action: "model_switch", status: "available", description: "Switch to cheaper/faster models" },
  { action: "prompt_adjustment", status: "active", description: "Optimize prompt templates" },
  { action: "workflow_reroute", status: "available", description: "Route to optimal paths" },
  { action: "cache_increase", status: "active", description: "Expand cache for hot data" },
  { action: "execution_throttle", status: "standby", description: "Rate limit under pressure" },
];

export function OptimizationEngine() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Settings className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Optimization Engine</h3>
            <p className="text-xs text-muted-foreground">Auto-tuning performance</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          optimizing
        </span>
      </div>

      {/* Optimization Targets */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Optimization Targets</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {targets.map((target) => (
            <div
              key={target.name}
              className="p-3 rounded-lg border border-border bg-secondary/30 text-center"
            >
              <target.icon className={`w-4 h-4 ${target.color} mx-auto mb-2`} />
              <div className={`font-mono text-lg font-bold ${target.color}`}>{target.value}</div>
              <div className="text-[10px] text-muted-foreground truncate">{target.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Actions */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Auto Actions</div>
        <div className="space-y-2">
          {autoActions.map((action) => (
            <div
              key={action.action}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    action.status === "active"
                      ? "bg-success animate-pulse"
                      : action.status === "available"
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  }`}
                />
                <div>
                  <div className="font-mono text-sm text-foreground">{action.action}</div>
                  <div className="text-[10px] text-muted-foreground">{action.description}</div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  action.status === "active"
                    ? "bg-success/20 text-success"
                    : action.status === "available"
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {action.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
