import { Building, Clock, FileText, Brain, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    feature: "custom_sla",
    icon: Clock,
    description: "SLAs customizados por cliente enterprise",
    enabled: true,
    clients: 7,
  },
  {
    feature: "dedicated_audit_logs",
    icon: FileText,
    description: "Logs de auditoria dedicados e isolados",
    enabled: true,
    clients: 12,
  },
  {
    feature: "private_memory",
    icon: Brain,
    description: "Memória privada e isolada por tenant",
    enabled: true,
    clients: 15,
  },
  {
    feature: "on_premise_support",
    icon: Server,
    description: "Suporte a deploy on-premise",
    enabled: true,
    clients: 3,
  },
];

const enterpriseClients = [
  { name: "Acme Corp", tier: "platinum", agents: 45, mrr: "$45K" },
  { name: "TechGiant Inc", tier: "gold", agents: 28, mrr: "$28K" },
  { name: "FinanceHub", tier: "platinum", agents: 67, mrr: "$67K" },
];

export function EnterpriseControls() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Enterprise Controls</h3>
          <p className="text-xs text-muted-foreground">Controles para clientes enterprise</p>
        </div>
        <Building className="w-5 h-5 text-primary" />
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {features.map((item) => (
          <div
            key={item.feature}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm text-foreground mb-0.5">{item.feature}</div>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-bold text-foreground">{item.clients}</div>
              <div className="text-[10px] text-success">clients</div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Clients */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Top Enterprise Clients</h4>
        <div className="space-y-2">
          {enterpriseClients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{client.name}</div>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    client.tier === "platinum" ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"
                  )}>
                    {client.tier}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{client.mrr}</div>
                <div className="text-[10px] text-muted-foreground">{client.agents} agents</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
