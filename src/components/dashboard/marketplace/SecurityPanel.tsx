import { Shield, Key, Lock, RefreshCw, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const authMethods = [
  { method: "api_keys", icon: Key, status: "active", usage: "847 keys" },
  { method: "oauth_2.0", icon: Lock, status: "active", usage: "312 tokens" },
  { method: "jwt_auth", icon: Shield, status: "active", usage: "1.2K sessions" },
];

const protections = [
  { protection: "rate_limit", description: "Proteção contra sobrecarga", status: "enforced", level: "strict" },
  { protection: "abuse_detection", description: "Detecção de uso anormal via ML", status: "active", level: "ml-powered" },
  { protection: "key_rotation", description: "Rotação automática de chaves", status: "scheduled", level: "30 days" },
];

const securityStats = [
  { label: "Blocked Requests", value: "12.4K", period: "24h" },
  { label: "Auth Failures", value: "847", period: "24h" },
  { label: "Key Rotations", value: "56", period: "7d" },
  { label: "Threat Score", value: "Low", period: "current" },
];

export function SecurityPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Security</h3>
          <p className="text-xs text-muted-foreground">Autenticação e proteções de segurança</p>
        </div>
        <Shield className="w-5 h-5 text-success" />
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {securityStats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
            <div className={cn(
              "text-lg font-bold",
              stat.label === "Threat Score" ? "text-success" : "text-foreground"
            )}>
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            <span className="text-[10px] text-muted-foreground">({stat.period})</span>
          </div>
        ))}
      </div>

      {/* Auth Methods */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Auth Methods</h4>
        <div className="grid grid-cols-3 gap-3">
          {authMethods.map((item) => (
            <div
              key={item.method}
              className="p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs text-foreground uppercase">{item.method}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{item.usage}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protections */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Protections</h4>
        <div className="space-y-2">
          {protections.map((item) => (
            <div
              key={item.protection}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div>
                <div className="font-mono text-sm text-foreground">{item.protection}</div>
                <div className="text-[10px] text-muted-foreground">{item.description}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-primary">{item.level}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  item.status === "enforced" ? "bg-success/20 text-success" : 
                  item.status === "active" ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
