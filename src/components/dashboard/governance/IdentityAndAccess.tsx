import { User, Bot, Shield, Lock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    feature: "agent_identity",
    icon: Bot,
    description: "Identidade única e verificável para cada agente",
    status: "active",
    count: 847,
  },
  {
    feature: "service_account_agents",
    icon: User,
    description: "Contas de serviço para execução programática",
    status: "active",
    count: 156,
  },
  {
    feature: "rbac",
    icon: Shield,
    description: "Role-based access control granular",
    status: "active",
    count: 23,
  },
  {
    feature: "policy_based_access",
    icon: Lock,
    description: "Políticas de acesso baseadas em contexto",
    status: "active",
    count: 47,
  },
  {
    feature: "tenant_isolation",
    icon: Users,
    description: "Isolamento completo entre tenants",
    status: "active",
    count: 142,
  },
];

export function IdentityAndAccess() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Identity & Access</h3>
          <p className="text-xs text-muted-foreground">Controle de identidade e acesso</p>
        </div>
        <Shield className="w-5 h-5 text-success" />
      </div>

      <div className="space-y-3">
        {features.map((item) => (
          <div
            key={item.feature}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-success/30 transition-colors"
          >
            <div className="p-2 rounded-lg bg-success/10 shrink-0">
              <item.icon className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-sm text-foreground">{item.feature}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
              </div>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold text-foreground">{item.count}</div>
              <div className="text-[10px] text-muted-foreground">active</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
