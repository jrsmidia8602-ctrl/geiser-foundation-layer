import { AlertTriangle, ArrowRight, Rocket, Zap, CreditCard, Bot, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const gaps = [
  { id: "workflow_orchestrator", label: "Workflow Orchestrator", status: "missing", severity: "high" },
  { id: "agent_autonomy_loop", label: "Agent Autonomy Loop", status: "not_enabled", severity: "medium" },
  { id: "billing_live_switch", label: "Billing Live Switch", status: "off", severity: "high" },
  { id: "self_healing", label: "Self-Healing", status: "partial", severity: "low" },
];

const nextActions = [
  { action: "deploy_orchestrator_edge_function", icon: Rocket, priority: 1 },
  { action: "enable_agent_autonomy_loop", icon: Bot, priority: 2 },
  { action: "connect_billing_webhooks", icon: CreditCard, priority: 3 },
  { action: "activate_marketplace_checkout", icon: Zap, priority: 4 },
  { action: "enable_self_scaling", icon: Scale, priority: 5 },
];

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/20", border: "border-destructive/30" },
  medium: { color: "text-warning", bg: "bg-warning/20", border: "border-warning/30" },
  low: { color: "text-muted-foreground", bg: "bg-secondary", border: "border-border" },
};

export function RuntimeGapsActions() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Gaps & Next Actions</h3>
            <p className="text-xs text-muted-foreground">System gaps and deployment roadmap</p>
          </div>
        </div>
      </div>

      {/* Gaps Detected */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Gaps Detected</h4>
        <div className="space-y-2">
          {gaps.map((gap) => {
            const config = severityConfig[gap.severity as keyof typeof severityConfig];
            return (
              <div
                key={gap.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  config.bg,
                  config.border
                )}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className={cn("w-4 h-4", config.color)} />
                  <span className="text-sm text-foreground">{gap.label}</span>
                </div>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-mono uppercase", config.bg, config.color)}>
                  {gap.status.replace("_", " ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Backend Actions */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Next Backend Actions</h4>
        <div className="space-y-2">
          {nextActions.map((action) => (
            <div
              key={action.action}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {action.priority}
                </div>
                <action.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-foreground">{action.action}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
