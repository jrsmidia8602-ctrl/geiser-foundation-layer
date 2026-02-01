import { BarChart3, TrendingUp, Brain, DollarSign, Target, Gauge } from "lucide-react";

const metrics = [
  {
    name: "decision_accuracy",
    label: "Decision Accuracy",
    value: "97.3%",
    trend: "+2.1%",
    icon: Target,
    color: "text-success",
  },
  {
    name: "avg_confidence",
    label: "Avg Confidence",
    value: "94.7%",
    trend: "+1.4%",
    icon: Gauge,
    color: "text-primary",
  },
  {
    name: "learning_gain",
    label: "Learning Gain",
    value: "+12.4%",
    trend: "+3.2%",
    icon: Brain,
    color: "text-accent",
  },
  {
    name: "cost_savings_generated",
    label: "Cost Savings",
    value: "$1,247",
    trend: "+$320",
    icon: DollarSign,
    color: "text-warning",
  },
];

const weeklyTrend = [
  { day: "Mon", decisions: 245, accuracy: 96 },
  { day: "Tue", decisions: 312, accuracy: 97 },
  { day: "Wed", decisions: 287, accuracy: 95 },
  { day: "Thu", decisions: 356, accuracy: 98 },
  { day: "Fri", decisions: 298, accuracy: 97 },
  { day: "Sat", decisions: 189, accuracy: 96 },
  { day: "Sun", decisions: 156, accuracy: 98 },
];

export function BrainAnalytics() {
  const maxDecisions = Math.max(...weeklyTrend.map((d) => d.decisions));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Brain Analytics</h3>
            <p className="text-xs text-muted-foreground">Cognitive performance metrics</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 rounded-lg border border-border bg-secondary/30 text-center">
            <metric.icon className={`w-5 h-5 ${metric.color} mx-auto mb-2`} />
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
            <div className="text-[10px] text-success flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Trend Chart */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Weekly Decision Volume</div>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyTrend.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-gradient-to-t from-primary/50 to-primary hover:from-primary/70 hover:to-primary transition-colors"
                style={{ height: `${(day.decisions / maxDecisions) * 100}%` }}
              />
              <div className="text-[10px] text-muted-foreground">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl font-bold text-foreground">1,843</div>
          <div className="text-xs text-muted-foreground">Total Decisions</div>
        </div>
        <div>
          <div className="text-xl font-bold text-foreground">96.7%</div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div>
          <div className="text-xl font-bold text-foreground">23ms</div>
          <div className="text-xs text-muted-foreground">Avg Latency</div>
        </div>
      </div>
    </div>
  );
}
