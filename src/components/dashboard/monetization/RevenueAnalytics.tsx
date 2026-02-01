import { TrendingUp, DollarSign, Users, BarChart3, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    metric: "mrr",
    label: "MRR",
    value: 12434,
    change: 18.5,
    trend: "up",
    icon: DollarSign,
  },
  {
    metric: "arpu",
    label: "ARPU",
    value: 87.56,
    change: 4.2,
    trend: "up",
    icon: Users,
  },
  {
    metric: "ltv",
    label: "LTV",
    value: 1245,
    change: 12.8,
    trend: "up",
    icon: TrendingUp,
  },
  {
    metric: "churn",
    label: "Churn",
    value: 2.3,
    change: -0.5,
    trend: "down",
    icon: BarChart3,
    suffix: "%",
    invertColor: true,
  },
];

const revenueBySource = [
  { source: "Subscriptions", amount: 8924, percentage: 72 },
  { source: "Usage Overage", amount: 2145, percentage: 17 },
  { source: "Priority Fees", amount: 865, percentage: 7 },
  { source: "White-label", amount: 500, percentage: 4 },
];

const mrrHistory = [
  { month: "Sep", value: 8200 },
  { month: "Oct", value: 9100 },
  { month: "Nov", value: 10400 },
  { month: "Dec", value: 11200 },
  { month: "Jan", value: 12434 },
];

export function RevenueAnalytics() {
  const maxMrr = Math.max(...mrrHistory.map(m => m.value));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <BarChart3 className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Revenue Analytics</h3>
            <p className="text-xs text-muted-foreground">Key financial metrics</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((m) => {
          const isPositive = m.invertColor ? m.change < 0 : m.change > 0;
          return (
            <div
              key={m.metric}
              className="p-3 rounded-xl border border-border hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <m.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-foreground">
                  {m.metric !== "churn" && "$"}
                  {m.value.toLocaleString()}
                  {m.suffix || ""}
                </span>
                <div className={cn(
                  "flex items-center gap-0.5 text-[10px]",
                  isPositive ? "text-success" : "text-destructive"
                )}>
                  {isPositive ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {Math.abs(m.change)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MRR Chart */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">MRR Trend</h4>
        <div className="flex items-end gap-2 h-24">
          {mrrHistory.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t transition-all hover:opacity-80"
                style={{ height: `${(m.value / maxMrr) * 100}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Source */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Revenue by Source</h4>
        <div className="space-y-2">
          {revenueBySource.map((source) => (
            <div key={source.source} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground">{source.source}</span>
                  <span className="text-xs font-medium text-foreground">${source.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-warning to-success rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground w-8">{source.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
