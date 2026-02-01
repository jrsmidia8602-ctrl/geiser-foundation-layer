import { Shield, AlertTriangle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const accessFeatures = [
  { feature: "hard_limits", label: "Hard Limits", description: "Bloqueia ao atingir limite", enabled: true },
  { feature: "grace_period", label: "Grace Period", description: "Período de tolerância", enabled: true },
  { feature: "auto_suspend", label: "Auto Suspend", description: "Suspende automaticamente", enabled: true },
];

const tenantStatus = [
  { tenant: "Acme Corp", plan: "pro", usage: 85, status: "active", warning: true },
  { tenant: "TechStart", plan: "starter", usage: 45, status: "active", warning: false },
  { tenant: "DataFlow", plan: "pro", usage: 102, status: "grace", warning: true },
  { tenant: "OldClient", plan: "starter", usage: 0, status: "suspended", warning: false },
];

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  active: { color: "text-success", bg: "bg-success/20", border: "border-success/30" },
  grace: { color: "text-warning", bg: "bg-warning/20", border: "border-warning/30" },
  suspended: { color: "text-destructive", bg: "bg-destructive/20", border: "border-destructive/30" },
};

export function AccessControl() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/20">
            <Shield className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Access Control</h3>
            <p className="text-xs text-muted-foreground">Limit enforcement & suspension</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {accessFeatures.map((feature) => (
          <div
            key={feature.feature}
            className={cn(
              "p-3 rounded-lg border transition-all",
              feature.enabled
                ? "bg-success/10 border-success/30"
                : "bg-secondary/30 border-border"
            )}
          >
            <div className="flex items-center gap-1 mb-1">
              <span className={cn(
                "text-xs font-medium",
                feature.enabled ? "text-success" : "text-muted-foreground"
              )}>
                {feature.label}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Tenant Status */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Tenant Status</h4>
        <div className="space-y-2">
          {tenantStatus.map((tenant) => {
            const cfg = statusConfig[tenant.status];
            return (
              <div
                key={tenant.tenant}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  cfg.border,
                  tenant.status === "suspended" && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{tenant.tenant}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                      {tenant.plan}
                    </span>
                  </div>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full",
                    cfg.bg, cfg.color
                  )}>
                    {tenant.status}
                  </span>
                </div>
                
                {tenant.status !== "suspended" && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          tenant.usage > 100 ? "bg-destructive" :
                          tenant.usage > 80 ? "bg-warning" : "bg-success"
                        )}
                        style={{ width: `${Math.min(tenant.usage, 100)}%` }}
                      />
                    </div>
                    <span className={cn(
                      "text-[10px] font-mono",
                      tenant.usage > 100 ? "text-destructive" :
                      tenant.usage > 80 ? "text-warning" : "text-muted-foreground"
                    )}>
                      {tenant.usage}%
                    </span>
                    {tenant.warning && (
                      <AlertTriangle className="w-3 h-3 text-warning" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
