import { DollarSign, AlertTriangle, Shield, TrendingDown, Gauge } from "lucide-react";

const controls = [
  {
    name: "hard_spend_limit_per_agent",
    description: "Maximum spend cap per agent",
    value: "$50/day",
    status: "enforced",
    icon: Shield,
  },
  {
    name: "soft_budget_warning",
    description: "Alert threshold before limit",
    value: "80%",
    status: "active",
    icon: AlertTriangle,
  },
  {
    name: "auto_kill_switch",
    description: "Emergency shutdown trigger",
    value: "$100/day",
    status: "armed",
    icon: DollarSign,
  },
  {
    name: "priority_degradation",
    description: "Reduce priority under budget pressure",
    value: "enabled",
    status: "standby",
    icon: TrendingDown,
  },
];

const budgetMetrics = [
  { label: "Today's Spend", value: "$34.20", percentage: 68, color: "from-success to-primary" },
  { label: "Weekly Budget", value: "$180/$350", percentage: 51, color: "from-primary to-accent" },
  { label: "Monthly Savings", value: "$1,247", percentage: 100, color: "from-success to-success" },
];

export function EconomicGovernor() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <DollarSign className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Economic Governor</h3>
            <p className="text-xs text-muted-foreground">Cost control & budget management</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          enabled
        </span>
      </div>

      {/* Budget Metrics */}
      <div className="space-y-4 mb-6">
        {budgetMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-mono text-foreground">{metric.value}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                style={{ width: `${metric.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Control Mechanisms</div>
        <div className="space-y-2">
          {controls.map((control) => (
            <div
              key={control.name}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <control.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-mono text-xs text-foreground">{control.name}</div>
                  <div className="text-[10px] text-muted-foreground">{control.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-primary">{control.value}</div>
                <div
                  className={`text-[10px] ${
                    control.status === "enforced"
                      ? "text-destructive"
                      : control.status === "active"
                      ? "text-success"
                      : control.status === "armed"
                      ? "text-warning"
                      : "text-muted-foreground"
                  }`}
                >
                  {control.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
