import { Brain, ArrowDown, Gauge, Cpu, Sparkles, GitBranch } from "lucide-react";

const decisionModes = [
  { mode: "rule_based", label: "Rule Based", active: true, description: "Deterministic rules" },
  { mode: "ml_assisted", label: "ML Assisted", active: false, description: "Pattern recognition" },
  { mode: "llm_reasoning", label: "LLM Reasoning", active: false, description: "Natural language" },
  { mode: "hybrid", label: "Hybrid", active: false, description: "Combined approach" },
];

const decisionFlow = [
  { step: "receive_event", status: "complete" },
  { step: "load_context", status: "complete" },
  { step: "apply_rules", status: "active" },
  { step: "calculate_confidence", status: "pending" },
  { step: "return_action", status: "pending" },
];

export function DecisionEngineAdvanced() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Decision Engine</h3>
            <p className="text-xs text-muted-foreground">Multi-mode cognitive processor</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          active
        </span>
      </div>

      {/* Decision Modes */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Decision Modes</div>
        <div className="grid grid-cols-2 gap-2">
          {decisionModes.map((mode) => (
            <div
              key={mode.mode}
              className={`p-3 rounded-lg border ${
                mode.active
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-secondary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {mode.mode === "rule_based" && <GitBranch className="w-3 h-3 text-primary" />}
                {mode.mode === "ml_assisted" && <Cpu className="w-3 h-3 text-accent" />}
                {mode.mode === "llm_reasoning" && <Sparkles className="w-3 h-3 text-warning" />}
                {mode.mode === "hybrid" && <Brain className="w-3 h-3 text-success" />}
                <span className={`font-mono text-xs ${mode.active ? "text-primary" : "text-muted-foreground"}`}>
                  {mode.label}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground">{mode.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision flow visualization */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Decision Flow</div>
        <div className="space-y-2">
          {decisionFlow.map((item, i) => (
            <div key={item.step} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono ${
                  item.status === "complete"
                    ? "bg-success/20 text-success"
                    : item.status === "active"
                    ? "bg-primary/20 text-primary animate-pulse-glow"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`font-mono text-xs flex-1 ${
                  item.status === "complete"
                    ? "text-foreground"
                    : item.status === "active"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.step}
              </span>
              {i < decisionFlow.length - 1 && (
                <ArrowDown className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Output schema */}
      <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs mb-4">
        <div className="text-muted-foreground mb-2">// output schema</div>
        <div className="text-foreground space-y-1">
          <div><span className="text-primary">decision</span>: string</div>
          <div><span className="text-accent">confidence_score</span>: number</div>
          <div><span className="text-success">recommended_action</span>: string</div>
          <div><span className="text-warning">risk_level</span>: "low" | "medium" | "high"</div>
        </div>
      </div>

      {/* Confidence meter */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="w-4 h-4" />
            Average Confidence
          </div>
          <span className="text-foreground font-mono">94.7%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-success"
            style={{ width: "94.7%" }}
          />
        </div>
      </div>
    </div>
  );
}
