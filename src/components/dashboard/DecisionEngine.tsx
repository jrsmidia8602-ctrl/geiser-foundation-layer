import { Brain, ArrowDown, Gauge } from "lucide-react";

const decisionFlow = [
  { step: "receive_event", status: "complete" },
  { step: "load_context", status: "complete" },
  { step: "apply_rules", status: "active" },
  { step: "return_action", status: "pending" },
];

export function DecisionEngine() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Brain className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Decision Engine</h3>
            <p className="text-xs text-muted-foreground">Rule-based decisions</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          rule_based
        </span>
      </div>

      {/* Decision flow visualization */}
      <div className="space-y-3 mb-6">
        {decisionFlow.map((item, i) => (
          <div key={item.step} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
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
              className={`font-mono text-sm ${
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
              <ArrowDown className="w-3 h-3 text-muted-foreground ml-auto" />
            )}
          </div>
        ))}
      </div>

      {/* Output preview */}
      <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
        <div className="text-muted-foreground mb-2">// output schema</div>
        <div className="text-foreground">
          <span className="text-primary">decision</span>: string
          <br />
          <span className="text-accent">confidence_score</span>: number
          <br />
          <span className="text-success">action</span>: string
        </div>
      </div>

      {/* Confidence meter */}
      <div className="mt-4 pt-4 border-t border-border">
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
