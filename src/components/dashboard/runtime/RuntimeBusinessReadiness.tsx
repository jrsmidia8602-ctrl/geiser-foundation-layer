import { TrendingUp, Target, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const scores = [
  { metric: "Technical", score: 0.86, icon: Target },
  { metric: "Scalability", score: 0.91, icon: TrendingUp },
];

const readinessChecks = [
  { check: "monetization_ready", ready: false },
  { check: "marketplace_checkout", ready: false },
  { check: "billing_webhooks", ready: false },
  { check: "agent_execution", ready: true },
  { check: "telemetry_active", ready: true },
  { check: "security_configured", ready: true },
];

const telemetryMetrics = [
  "agent_latency",
  "agent_success_rate",
  "calls_per_tenant",
  "cost_per_execution",
  "revenue_projection",
];

export function RuntimeBusinessReadiness() {
  const readyCount = readinessChecks.filter(c => c.ready).length;
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Business Readiness</h3>
            <p className="text-xs text-muted-foreground">Production & monetization status</p>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {scores.map((item) => {
          const percentage = Math.round(item.score * 100);
          return (
            <div
              key={item.metric}
              className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30"
            >
              <div className="flex items-center justify-between mb-2">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{percentage}%</span>
              </div>
              <div className="text-xs text-muted-foreground">{item.metric} Score</div>
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Time to Live */}
      <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className="text-sm text-foreground">Estimated Time to Live Sales</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-warning">7</span>
            <span className="text-sm text-warning ml-1">days</span>
          </div>
        </div>
      </div>

      {/* Readiness Checks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Readiness Checks</h4>
          <span className="text-xs text-muted-foreground">{readyCount}/{readinessChecks.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {readinessChecks.map((check) => (
            <div
              key={check.check}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border text-xs",
                check.ready
                  ? "bg-success/10 border-success/30"
                  : "bg-secondary/50 border-border"
              )}
            >
              {check.ready ? (
                <CheckCircle className="w-3 h-3 text-success" />
              ) : (
                <XCircle className="w-3 h-3 text-muted-foreground" />
              )}
              <span className={cn("font-mono", check.ready ? "text-success" : "text-muted-foreground")}>
                {check.check}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Telemetry Metrics</h4>
        <div className="flex flex-wrap gap-1.5">
          {telemetryMetrics.map((metric) => (
            <span
              key={metric}
              className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/30 font-mono"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Auth: <span className="text-primary font-mono">api_key, jwt</span></span>
          <span>Audit: <span className="text-success">enabled</span></span>
        </div>
      </div>
    </div>
  );
}
