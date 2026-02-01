import { Calculator, Percent, TrendingUp, Layers, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingRules = [
  {
    rule: "volume_discount",
    name: "Volume Discount",
    description: "Desconto progressivo por volume de uso",
    icon: Percent,
    enabled: true,
    config: "10% off > 100K calls",
  },
  {
    rule: "tier_based_pricing",
    name: "Tier-Based Pricing",
    description: "Preços diferentes por tier de plano",
    icon: Layers,
    enabled: true,
    config: "Starter: $0.001 | Pro: $0.0008",
  },
  {
    rule: "priority_execution_fee",
    name: "Priority Execution",
    description: "Taxa extra para execução prioritária",
    icon: TrendingUp,
    enabled: true,
    config: "+50% for priority queue",
  },
  {
    rule: "sla_multiplier",
    name: "SLA Multiplier",
    description: "Multiplicador baseado em SLA contratado",
    icon: Clock,
    enabled: false,
    config: "99.99%: 1.5x | 99.9%: 1.0x",
  },
];

const recentCalculations = [
  { tenant: "Acme Corp", base: 45.00, discount: -4.50, priority: 10.00, total: 50.50 },
  { tenant: "TechStart", base: 29.00, discount: 0, priority: 0, total: 29.00 },
  { tenant: "DataFlow", base: 99.00, discount: -9.90, priority: 25.00, total: 114.10 },
];

export function PricingEngine() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Calculator className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Pricing Engine</h3>
            <p className="text-xs text-muted-foreground">Dynamic pricing rules</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
          dynamic_pricing: true
        </span>
      </div>

      {/* Pricing Rules */}
      <div className="space-y-3 mb-6">
        {pricingRules.map((rule) => (
          <div
            key={rule.rule}
            className={cn(
              "p-3 rounded-xl border transition-all",
              rule.enabled
                ? "border-primary/30 bg-primary/5"
                : "border-border opacity-50"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <rule.icon className={cn("w-4 h-4", rule.enabled ? "text-primary" : "text-muted-foreground")} />
                <span className="font-medium text-foreground text-sm">{rule.name}</span>
              </div>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full",
                rule.enabled
                  ? "bg-success/20 text-success"
                  : "bg-secondary text-muted-foreground"
              )}>
                {rule.enabled ? "enabled" : "disabled"}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mb-1">{rule.description}</p>
            <code className="text-[10px] font-mono text-muted-foreground">{rule.config}</code>
          </div>
        ))}
      </div>

      {/* Recent Calculations */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Calculations</h4>
        <div className="space-y-2">
          {recentCalculations.map((calc, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{calc.tenant}</span>
                <span className="text-sm font-bold text-success">${calc.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>Base: ${calc.base.toFixed(2)}</span>
                {calc.discount !== 0 && (
                  <span className="text-success">Disc: {calc.discount.toFixed(2)}</span>
                )}
                {calc.priority > 0 && (
                  <span className="text-warning">Priority: +${calc.priority.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
