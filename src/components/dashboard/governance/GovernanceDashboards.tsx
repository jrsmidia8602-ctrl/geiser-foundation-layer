import { LayoutDashboard, Shield, AlertTriangle, DollarSign, FileCheck, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const views = [
  {
    view: "governance_overview",
    icon: LayoutDashboard,
    description: "Visão geral de governança do sistema",
    users: 156,
    color: "from-primary to-accent",
  },
  {
    view: "agent_risk_map",
    icon: AlertTriangle,
    description: "Mapa de riscos por agente",
    users: 89,
    color: "from-warning to-destructive",
  },
  {
    view: "cost_vs_value",
    icon: DollarSign,
    description: "Análise de custo vs valor gerado",
    users: 112,
    color: "from-success to-warning",
  },
  {
    view: "compliance_status",
    icon: FileCheck,
    description: "Status de conformidade por framework",
    users: 67,
    color: "from-success to-primary",
  },
  {
    view: "audit_trails",
    icon: FileSearch,
    description: "Trilhas de auditoria detalhadas",
    users: 45,
    color: "from-accent to-primary",
  },
];

export function GovernanceDashboards() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Governance Dashboards</h3>
          <p className="text-xs text-muted-foreground">Visualizações e painéis de governança</p>
        </div>
        <LayoutDashboard className="w-5 h-5 text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {views.map((item) => (
          <div
            key={item.view}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all overflow-hidden cursor-pointer"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", item.color)} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", item.color)}>
                  <item.icon className="w-4 h-4 text-background" />
                </div>
                <span className="text-xs text-muted-foreground">{item.users} users</span>
              </div>
              
              <div className="font-mono text-sm text-foreground mb-1">{item.view}</div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-center">
          <div className="text-2xl font-bold text-success">98%</div>
          <div className="text-xs text-muted-foreground">Compliance Score</div>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
          <div className="text-2xl font-bold text-primary">1.2M</div>
          <div className="text-xs text-muted-foreground">Audit Events</div>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 text-center">
          <div className="text-2xl font-bold text-warning">3</div>
          <div className="text-xs text-muted-foreground">Open Incidents</div>
        </div>
      </div>
    </div>
  );
}
