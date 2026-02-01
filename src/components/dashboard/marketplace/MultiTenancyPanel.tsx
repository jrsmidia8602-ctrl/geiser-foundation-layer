import { Users, Shield, DollarSign, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tenancyConfig = [
  { config: "enabled", value: "true", description: "Multi-tenancy ativo", icon: CheckCircle2 },
  { config: "isolation", value: "logical", description: "Isolamento lógico por tenant", icon: Shield },
  { config: "billing_per_tenant", value: "true", description: "Billing individual por tenant", icon: DollarSign },
];

const tenantStats = [
  { label: "Total Tenants", value: "847", trend: "+12%" },
  { label: "Active Today", value: "623", trend: "+8%" },
  { label: "Avg Revenue/Tenant", value: "$142", trend: "+15%" },
  { label: "Data Isolation", value: "100%", trend: "stable" },
];

const topTenants = [
  { name: "Enterprise Corp", usage: "$12.4K", agents: 45, status: "premium" },
  { name: "Startup Inc", usage: "$4.2K", agents: 18, status: "pro" },
  { name: "Agency XYZ", usage: "$3.8K", agents: 24, status: "pro" },
  { name: "Tech Solutions", usage: "$2.1K", agents: 12, status: "starter" },
];

export function MultiTenancyPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Multi-Tenancy</h3>
          <p className="text-xs text-muted-foreground">Configuração e gestão de tenants</p>
        </div>
        <Users className="w-5 h-5 text-primary" />
      </div>

      {/* Tenant Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {tenantStats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
            <div className="text-lg font-bold text-foreground">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            <span className={cn(
              "text-[10px]",
              stat.trend === "stable" ? "text-muted-foreground" : "text-success"
            )}>
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Config */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Configuration</h4>
        <div className="grid grid-cols-3 gap-3">
          {tenancyConfig.map((item) => (
            <div
              key={item.config}
              className="p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-success" />
                <span className="font-mono text-xs text-foreground">{item.config}</span>
              </div>
              <div className="text-sm font-bold text-primary">{item.value}</div>
              <div className="text-[10px] text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tenants */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Top Tenants</h4>
        <div className="space-y-2">
          {topTenants.map((tenant) => (
            <div
              key={tenant.name}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">{tenant.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">{tenant.usage}</div>
                  <div className="text-[10px] text-muted-foreground">monthly</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">{tenant.agents}</div>
                  <div className="text-[10px] text-muted-foreground">agents</div>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  tenant.status === "premium" ? "bg-warning/20 text-warning" :
                  tenant.status === "pro" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {tenant.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
