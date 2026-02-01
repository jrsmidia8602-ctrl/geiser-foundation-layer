import { Workflow, Zap, TrendingDown, TrendingUp, UserX, UserCheck, RefreshCw, Gift } from "lucide-react";

export function AutomationRules() {
  const rules = [
    { 
      trigger: "low_conversion", 
      action: "switch_offer", 
      description: "Auto-switch to higher converting offer",
      triggerIcon: TrendingDown,
      actionIcon: Gift,
      executions: 234,
      status: "active"
    },
    { 
      trigger: "high_intent", 
      action: "activate_upsell", 
      description: "Trigger upsell for engaged users",
      triggerIcon: TrendingUp,
      actionIcon: Zap,
      executions: 1847,
      status: "active"
    },
    { 
      trigger: "returning_user", 
      action: "personalized_pricing", 
      description: "Apply loyalty-based pricing",
      triggerIcon: UserCheck,
      actionIcon: RefreshCw,
      executions: 892,
      status: "active"
    },
    { 
      trigger: "inactive_user", 
      action: "reactivation_campaign", 
      description: "Launch win-back automation",
      triggerIcon: UserX,
      actionIcon: Workflow,
      executions: 456,
      status: "active"
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Workflow className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Automation Rules</h3>
            <p className="text-xs text-muted-foreground">Trigger-action automations</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
          4 rules active
        </span>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.trigger} className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-accent/30 transition-colors">
            <div className="flex items-center gap-4">
              {/* Trigger */}
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 rounded bg-destructive/10">
                  <rule.triggerIcon className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">IF</span>
                  <div className="text-sm font-mono text-foreground">{rule.trigger}</div>
                </div>
              </div>

              {/* Arrow */}
              <Zap className="w-4 h-4 text-accent" />

              {/* Action */}
              <div className="flex items-center gap-2 flex-1">
                <div className="p-1.5 rounded bg-success/10">
                  <rule.actionIcon className="w-4 h-4 text-success" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">THEN</span>
                  <div className="text-sm font-mono text-foreground">{rule.action}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-sm font-mono text-primary">{rule.executions.toLocaleString()}</div>
                <span className="text-xs text-muted-foreground">executions</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 ml-8">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
