import { Cpu, Play, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const executionSteps = [
  { step: "pre_validation", label: "Pre-Validation", description: "Schema & auth check", icon: CheckCircle2, status: "complete" },
  { step: "decision_hook", label: "Decision Hook", description: "Apply business rules", icon: CheckCircle2, status: "complete" },
  { step: "action_execution", label: "Action Execution", description: "Run agent logic", icon: Loader2, status: "active" },
  { step: "post_processing", label: "Post-Processing", description: "Transform output", icon: Clock, status: "pending" },
  { step: "logging", label: "Logging", description: "Audit & metrics", icon: Clock, status: "pending" },
];

const runtimes = [
  { name: "Node.js", active: true, version: "20.x", executions: 4521 },
  { name: "Python", active: true, version: "3.11", executions: 1247 },
  { name: "Edge Functions", active: true, version: "latest", executions: 892 },
];

export function ExecutionEngine() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Cpu className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Execution Engine</h3>
            <p className="text-xs text-muted-foreground font-mono">runtime</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Processing</span>
        </div>
      </div>

      {/* Execution Steps */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Execution Pipeline</h4>
        <div className="space-y-2">
          {executionSteps.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all",
                  item.status === "complete" && "bg-success/10",
                  item.status === "active" && "bg-primary/10 border border-primary/30",
                  item.status === "pending" && "bg-muted/50"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4",
                  item.status === "complete" && "text-success",
                  item.status === "active" && "text-primary animate-spin",
                  item.status === "pending" && "text-muted-foreground"
                )} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-sm font-medium",
                      item.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{item.step}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported Runtimes */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Runtimes</h4>
        <div className="grid grid-cols-3 gap-2">
          {runtimes.map((runtime) => (
            <div key={runtime.name} className="p-3 rounded-lg bg-secondary/50 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", runtime.active ? "bg-success" : "bg-muted")} />
                <span className="text-xs font-medium text-foreground">{runtime.name}</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">{runtime.version}</div>
              <div className="text-xs text-primary mt-1">{runtime.executions.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeouts */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-xs text-muted-foreground font-mono">
          <span>default_timeout:</span>
          <span className="text-foreground">30,000ms</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
          <span>max_timeout:</span>
          <span className="text-warning">120,000ms</span>
        </div>
      </div>
    </div>
  );
}
