import { TrendingUp, DollarSign, Percent, Package, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const optimizations = [
  {
    feature: "auto_pricing",
    enabled: true,
    description: "Ajuste automático de preços baseado em demanda e competição",
    impact: "+18% revenue",
    icon: DollarSign,
  },
  {
    feature: "dynamic_discounts",
    enabled: true,
    description: "Descontos personalizados por segmento e comportamento",
    impact: "+25% conversion",
    icon: Percent,
  },
  {
    feature: "bundle_suggestions",
    enabled: true,
    description: "Sugestão automática de bundles complementares",
    impact: "+32% basket size",
    icon: Package,
  },
  {
    feature: "upsell_cross_sell",
    enabled: true,
    description: "Recomendações de upgrade e produtos relacionados",
    impact: "+15% LTV",
    icon: ArrowUpRight,
  },
];

export function RevenueOptimization() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Revenue Optimization</h3>
          <p className="text-xs text-muted-foreground">Otimização automática de receita</p>
        </div>
        <TrendingUp className="w-5 h-5 text-success" />
      </div>

      <div className="space-y-3">
        {optimizations.map((item) => (
          <div
            key={item.feature}
            className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-success/30 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-success/10 shrink-0">
                <item.icon className="w-4 h-4 text-success" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm text-foreground">{item.feature}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      {item.impact}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      item.enabled ? "bg-success" : "bg-muted"
                    )} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Total Revenue Impact</div>
            <div className="text-2xl font-bold text-foreground">+$340K/mo</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">Optimization Score</div>
            <div className="text-2xl font-bold text-success">94%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
