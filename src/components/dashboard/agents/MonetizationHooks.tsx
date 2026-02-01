import { DollarSign, Activity, Zap, MessageSquare, Phone, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const billableUnits = [
  { unit: "execution", icon: Zap, label: "Executions", count: 12457, rate: "$0.001", total: "$12.46" },
  { unit: "latency", icon: Activity, label: "Compute Time", count: 4521, rate: "$0.0001/ms", total: "$45.21" },
  { unit: "tokens", icon: MessageSquare, label: "AI Tokens", count: 1247000, rate: "$0.00001", total: "$12.47" },
  { unit: "calls", icon: Phone, label: "API Calls", count: 8924, rate: "$0.0005", total: "$4.46" },
];

const topAgentRevenue = [
  { name: "GPT Processor", revenue: 34.21, growth: 12.5 },
  { name: "Decision Router", revenue: 18.45, growth: 8.2 },
  { name: "Email Automator", revenue: 12.34, growth: -2.1 },
];

export function MonetizationHooks() {
  const totalRevenue = billableUnits.reduce((sum, unit) => sum + parseFloat(unit.total.replace("$", "")), 0);

  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <DollarSign className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Monetization</h3>
            <p className="text-xs text-muted-foreground font-mono">usage_tracking</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-success">${totalRevenue.toFixed(2)}</div>
          <div className="text-[10px] text-muted-foreground">this period</div>
        </div>
      </div>

      {/* Billable Units */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Billable Units</h4>
        <div className="grid grid-cols-2 gap-2">
          {billableUnits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.unit}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">{item.total}</span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                  <span>{item.count.toLocaleString()}</span>
                  <span className="font-mono">{item.rate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Revenue Agents */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Top Revenue Agents</h4>
        <div className="space-y-2">
          {topAgentRevenue.map((agent, i) => (
            <div
              key={agent.name}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{agent.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">${agent.revenue.toFixed(2)}</span>
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  agent.growth >= 0 ? "text-success" : "text-destructive"
                )}>
                  <TrendingUp className={cn("w-3 h-3", agent.growth < 0 && "rotate-180")} />
                  {Math.abs(agent.growth)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Ready */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">pricing_ready:</span>
          <span className="text-success font-medium">true</span>
        </div>
      </div>
    </div>
  );
}
