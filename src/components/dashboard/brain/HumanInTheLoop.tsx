import { Users, AlertTriangle, ShieldCheck, DollarSign, FileWarning, Pause, Play } from "lucide-react";

const triggers = [
  { name: "high_risk_action", icon: AlertTriangle, color: "text-destructive", count: 3 },
  { name: "low_confidence", icon: ShieldCheck, color: "text-warning", count: 7 },
  { name: "financial_operation", icon: DollarSign, color: "text-primary", count: 12 },
  { name: "policy_violation", icon: FileWarning, color: "text-accent", count: 0 },
];

const pendingApprovals = [
  { id: "APR-001", action: "Large payment processing", risk: "high", time: "2m ago" },
  { id: "APR-002", action: "User data export", risk: "medium", time: "5m ago" },
  { id: "APR-003", action: "API key rotation", risk: "low", time: "12m ago" },
];

export function HumanInTheLoop() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Human-in-the-Loop</h3>
            <p className="text-xs text-muted-foreground">Supervisão humana quando necessário</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          enabled
        </span>
      </div>

      {/* Trigger Conditions */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Trigger Conditions</div>
        <div className="grid grid-cols-2 gap-2">
          {triggers.map((trigger) => (
            <div
              key={trigger.name}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <trigger.icon className={`w-4 h-4 ${trigger.color}`} />
                <span className="font-mono text-xs text-foreground">{trigger.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-muted text-foreground font-mono">
                {trigger.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Pending Approvals</div>
        <div className="space-y-2">
          {pendingApprovals.map((approval) => (
            <div
              key={approval.id}
              className="flex items-center justify-between p-3 rounded-lg border border-warning/30 bg-warning/5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{approval.id}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      approval.risk === "high"
                        ? "bg-destructive/20 text-destructive"
                        : approval.risk === "medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {approval.risk}
                  </span>
                </div>
                <div className="text-xs text-foreground mt-1">{approval.action}</div>
                <div className="text-[10px] text-muted-foreground">{approval.time}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded bg-success/20 text-success hover:bg-success/30 transition-colors">
                  <Play className="w-3 h-3" />
                </button>
                <button className="p-1.5 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">
                  <Pause className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Info */}
      <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Pause State</div>
          <div className="font-mono text-sm text-warning">agent_suspended</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Resume Via</div>
          <div className="font-mono text-sm text-primary">dashboard_or_webhook</div>
        </div>
      </div>
    </div>
  );
}
