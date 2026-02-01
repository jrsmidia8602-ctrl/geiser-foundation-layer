import { Shield, Key, Lock, Gauge, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const authModes = [
  { mode: "api_key", label: "API Key", enabled: true, usage: 67 },
  { mode: "jwt", label: "JWT Token", enabled: true, usage: 28 },
  { mode: "service_token", label: "Service Token", enabled: true, usage: 5 },
];

const rateLimits = [
  { agent: "Decision Router", limit: 1000, current: 456, period: "1h" },
  { agent: "Email Automator", limit: 500, current: 489, period: "1h" },
  { agent: "GPT Processor", limit: 100, current: 98, period: "1h" },
];

export function SecurityPanel() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Shield className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Security</h3>
            <p className="text-xs text-muted-foreground font-mono">auth & rate_limit</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-success" />
          <span className="text-xs text-success font-medium">Protected</span>
        </div>
      </div>

      {/* Auth Modes */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Authentication Modes</h4>
        <div className="space-y-2">
          {authModes.map((auth) => (
            <div
              key={auth.mode}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{auth.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${auth.usage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{auth.usage}%</span>
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Limits */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
          <Gauge className="w-3 h-3" />
          Rate Limits (per agent)
        </h4>
        <div className="space-y-2">
          {rateLimits.map((limit) => {
            const percentage = (limit.current / limit.limit) * 100;
            const isWarning = percentage > 90;
            return (
              <div
                key={limit.agent}
                className="p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{limit.agent}</span>
                  <div className="flex items-center gap-2">
                    {isWarning && <AlertTriangle className="w-3 h-3 text-warning" />}
                    <span className={cn(
                      "text-xs font-mono",
                      isWarning ? "text-warning" : "text-muted-foreground"
                    )}>
                      {limit.current}/{limit.limit}
                    </span>
                    <span className="text-[10px] text-muted-foreground">/{limit.period}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      isWarning ? "bg-warning" : "bg-gradient-to-r from-success to-primary"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Status */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">auth_required:</span>
          <span className="text-success font-medium">true</span>
        </div>
      </div>
    </div>
  );
}
