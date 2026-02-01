import { DollarSign, TrendingUp, AlertTriangle, Power, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    feature: "budget_limits_per_agent",
    icon: DollarSign,
    description: "Limites de orçamento por agente",
    status: "enforced",
    value: "47 limits",
  },
  {
    feature: "cost_forecasting",
    icon: TrendingUp,
    description: "Previsão de custos baseada em padrões",
    status: "active",
    value: "98% accuracy",
  },
  {
    feature: "runaway_detection",
    icon: AlertTriangle,
    description: "Detecção de custos fora de controle",
    status: "monitoring",
    value: "3 alerts",
  },
  {
    feature: "automatic_kill_switch",
    icon: Power,
    description: "Desligamento automático em anomalias",
    status: "armed",
    value: "12 triggers",
  },
  {
    feature: "usage_alerts",
    icon: Bell,
    description: "Alertas de uso e threshold warnings",
    status: "active",
    value: "156 sent",
  },
];

export function EconomicGovernance() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Economic Governance</h3>
          <p className="text-xs text-muted-foreground">Controle econômico e orçamentário</p>
        </div>
        <DollarSign className="w-5 h-5 text-warning" />
      </div>

      <div className="space-y-3">
        {features.map((item) => (
          <div
            key={item.feature}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-warning/30 transition-colors"
          >
            <div className="p-2 rounded-lg bg-warning/10 shrink-0">
              <item.icon className="w-4 h-4 text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm text-foreground mb-0.5">{item.feature}</div>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold text-foreground">{item.value}</div>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                item.status === "enforced" ? "bg-success/20 text-success" :
                item.status === "armed" ? "bg-destructive/20 text-destructive" :
                "bg-warning/20 text-warning"
              )}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Overview */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-warning/10 to-success/10 border border-warning/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Monthly Budget Used</div>
            <div className="text-xl font-bold text-foreground">$45.2K / $60K</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Remaining</div>
            <div className="text-xl font-bold text-success">$14.8K</div>
          </div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-warning to-success" style={{ width: "75%" }} />
        </div>
      </div>
    </div>
  );
}
