import { Shield, FileText, Search, Hash, CheckCircle } from "lucide-react";

const hooks = [
  {
    name: "audit_every_decision",
    description: "Every decision is logged and traceable",
    enabled: true,
    icon: FileText,
  },
  {
    name: "explainability",
    description: "Human-readable decision explanations",
    enabled: true,
    icon: Search,
  },
  {
    name: "decision_trace_id",
    description: "Unique ID for each decision chain",
    enabled: true,
    icon: Hash,
  },
];

const recentDecisions = [
  { id: "DEC-7892", decision: "approve_payment", confidence: 0.94, risk: "low" },
  { id: "DEC-7891", decision: "escalate_to_human", confidence: 0.67, risk: "medium" },
  { id: "DEC-7890", decision: "cache_response", confidence: 0.99, risk: "low" },
  { id: "DEC-7889", decision: "switch_model", confidence: 0.82, risk: "low" },
];

export function GovernanceHooks() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Governance Hooks</h3>
            <p className="text-xs text-muted-foreground">Audit, compliance & explainability</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          compliant
        </span>
      </div>

      {/* Active Hooks */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Active Hooks</div>
        <div className="space-y-2">
          {hooks.map((hook) => (
            <div
              key={hook.name}
              className="flex items-center justify-between p-3 rounded-lg border border-success/30 bg-success/5"
            >
              <div className="flex items-center gap-3">
                <hook.icon className="w-4 h-4 text-success" />
                <div>
                  <div className="font-mono text-xs text-foreground">{hook.name}</div>
                  <div className="text-[10px] text-muted-foreground">{hook.description}</div>
                </div>
              </div>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Decisions */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Recent Decision Traces</div>
        <div className="space-y-2">
          {recentDecisions.map((decision) => (
            <div
              key={decision.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted-foreground">{decision.id}</span>
                <span className="font-mono text-xs text-foreground">{decision.decision}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-primary">{(decision.confidence * 100).toFixed(0)}%</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    decision.risk === "low"
                      ? "bg-success/20 text-success"
                      : decision.risk === "medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {decision.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
