import { DollarSign, Repeat, Key, Percent, Building } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingModels = [
  {
    model: "usage_based",
    icon: DollarSign,
    description: "Cobrado por uso real (tokens, calls, execuções)",
    popularity: 45,
    color: "from-primary to-accent",
  },
  {
    model: "subscription",
    icon: Repeat,
    description: "Planos mensais ou anuais com limites definidos",
    popularity: 30,
    color: "from-success to-primary",
  },
  {
    model: "one_time_license",
    icon: Key,
    description: "Licença perpétua com pagamento único",
    popularity: 10,
    color: "from-accent to-warning",
  },
  {
    model: "revenue_share",
    icon: Percent,
    description: "Percentual sobre o faturamento gerado",
    popularity: 10,
    color: "from-warning to-destructive",
  },
  {
    model: "enterprise_contract",
    icon: Building,
    description: "Contratos personalizados para grandes empresas",
    popularity: 5,
    color: "from-muted to-foreground",
  },
];

export function PricingModels() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Pricing Models</h3>
          <p className="text-xs text-muted-foreground">Modelos de precificação disponíveis</p>
        </div>
        <DollarSign className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-3">
        {pricingModels.map((item) => (
          <div
            key={item.model}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all overflow-hidden"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r", item.color)} />
            
            <div className="relative z-10 flex items-center gap-4">
              <div className={cn("p-2 rounded-lg bg-gradient-to-br shrink-0", item.color)}>
                <item.icon className="w-4 h-4 text-background" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm text-foreground mb-0.5">{item.model}</div>
                <div className="text-xs text-muted-foreground truncate">{item.description}</div>
              </div>
              
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-foreground">{item.popularity}%</div>
                <div className="text-[10px] text-muted-foreground">market share</div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r transition-all", item.color)}
                style={{ width: `${item.popularity}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
