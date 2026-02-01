import { Shield, Key, Clock, FileText, Users, Check, Lock } from "lucide-react";

export function SecurityStatus() {
  const securityFeatures = [
    { id: "auth", label: "Multi-Tenant JWT", description: "Isolated tenant authentication", icon: Key, status: "enabled" },
    { id: "rate_limit", label: "Rate Limiting", description: "API abuse prevention", icon: Clock, status: "enabled" },
    { id: "audit_logs", label: "Audit Logs", description: "Full action traceability", icon: FileText, status: "enabled" },
    { id: "role_based_access", label: "RBAC", description: "Role-based access control", icon: Users, status: "enabled" },
  ];

  const securityMetrics = [
    { label: "Threats Blocked", value: "12.4K", period: "this month" },
    { label: "Auth Success Rate", value: "99.97%", period: "last 24h" },
    { label: "Audit Events", value: "2.1M", period: "total" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10 border border-success/20">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
            <p className="text-xs text-muted-foreground">Enterprise-grade protection</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs">
          <Lock className="w-3 h-3" />
          secured
        </span>
      </div>

      {/* Security features */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {securityFeatures.map((feature) => (
          <div key={feature.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <feature.icon className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </div>
              <Check className="w-4 h-4 text-success" />
            </div>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Security metrics */}
      <div className="grid grid-cols-3 gap-3">
        {securityMetrics.map((metric, i) => (
          <div key={i} className="p-3 rounded-lg bg-success/5 border border-success/20 text-center">
            <div className="text-lg font-bold text-foreground">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
            <div className="text-xs text-muted-foreground/60">{metric.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
