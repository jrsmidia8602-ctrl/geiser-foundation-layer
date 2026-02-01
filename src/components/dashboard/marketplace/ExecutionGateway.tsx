import { Shield, Zap, Clock, Users, Lock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const gatewayFeatures = [
  { feature: "rate_limit", icon: Clock, description: "Limite de requisições por minuto", value: "1000/min", status: "active" },
  { feature: "throttling", icon: Activity, description: "Controle de vazão adaptativo", value: "adaptive", status: "active" },
  { feature: "auth_token", icon: Lock, description: "Autenticação por token JWT/API Key", value: "multi-auth", status: "active" },
  { feature: "tenant_isolation", icon: Users, description: "Isolamento lógico por tenant", value: "enforced", status: "active" },
];

const gatewayStats = [
  { label: "Requests/sec", value: "12.4K", trend: "+8%" },
  { label: "Avg Latency", value: "45ms", trend: "-12%" },
  { label: "Success Rate", value: "99.7%", trend: "+0.2%" },
  { label: "Active Tenants", value: "847", trend: "+15%" },
];

export function ExecutionGateway() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Execution Gateway</h3>
          <p className="text-xs text-muted-foreground">Gateway unificado de execução de agentes</p>
        </div>
        <Shield className="w-5 h-5 text-primary" />
      </div>

      {/* Gateway Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {gatewayStats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            <span className="text-[10px] text-success">{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Gateway Features */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Gateway Features</h4>
        <div className="space-y-2">
          {gatewayFeatures.map((item) => (
            <div
              key={item.feature}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground">{item.feature}</div>
                  <div className="text-[10px] text-muted-foreground">{item.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm text-foreground">{item.value}</div>
                <div className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full inline-block",
                  item.status === "active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
