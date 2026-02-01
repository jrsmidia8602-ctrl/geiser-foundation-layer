import { Cpu, RefreshCw, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const executionSteps = [
  { step: "state_load", label: "Load State", status: "complete" },
  { step: "node_execution", label: "Execute Node", status: "complete" },
  { step: "state_transition", label: "State Transition", status: "active" },
  { step: "checkpoint", label: "Checkpoint", status: "pending" },
  { step: "next_node", label: "Next Node", status: "pending" },
];

const retryPolicy = {
  enabled: true,
  max_retries: 3,
  backoff: "exponential",
  current_attempt: 1,
};

const timeouts = {
  per_node_ms: 30000,
  workflow_max_ms: 300000,
};

const recentExecutions = [
  { id: "exec_001", workflow: "User Onboarding", status: "success", duration: "1.2s", nodes: 6 },
  { id: "exec_002", workflow: "Order Pipeline", status: "success", duration: "3.8s", nodes: 8 },
  { id: "exec_003", workflow: "AI Content", status: "running", duration: "0.8s", nodes: 3 },
  { id: "exec_004", workflow: "Payment Recon", status: "failed", duration: "2.1s", nodes: 4 },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string; animate?: boolean }> = {
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/20" },
  running: { icon: RefreshCw, color: "text-primary", bg: "bg-primary/20", animate: true },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/20" },
};

export function ExecutionModel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Execution Model</h3>
            <p className="text-xs text-muted-foreground">State machine with parallelism</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
          parallelism_enabled
        </span>
      </div>

      {/* Execution Pipeline */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Execution Pipeline</h4>
        <div className="flex items-center gap-1">
          {executionSteps.map((step, i) => (
            <div key={step.step} className="flex items-center">
              <div
                className={cn(
                  "px-2 py-1 rounded text-[10px] font-mono transition-all",
                  step.status === "complete" && "bg-success/20 text-success border border-success/30",
                  step.status === "active" && "bg-primary/20 text-primary border border-primary/30 animate-pulse",
                  step.status === "pending" && "bg-secondary text-muted-foreground border border-border"
                )}
              >
                {step.label}
              </div>
              {i < executionSteps.length - 1 && (
                <div className={cn(
                  "w-4 h-px mx-1",
                  step.status === "complete" ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Retry & Timeout Config */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-3 h-3 text-warning" />
            <span className="text-xs font-medium text-foreground">Retry Policy</span>
          </div>
          <div className="space-y-1 text-[10px] text-muted-foreground">
            <div>Max Retries: {retryPolicy.max_retries}</div>
            <div>Backoff: {retryPolicy.backoff}</div>
            <div>Current: {retryPolicy.current_attempt}/{retryPolicy.max_retries}</div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3 h-3 text-accent" />
            <span className="text-xs font-medium text-foreground">Timeouts</span>
          </div>
          <div className="space-y-1 text-[10px] text-muted-foreground">
            <div>Per Node: {timeouts.per_node_ms / 1000}s</div>
            <div>Max Workflow: {timeouts.workflow_max_ms / 1000}s</div>
          </div>
        </div>
      </div>

      {/* Recent Executions */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Executions</h4>
        <div className="space-y-2">
          {recentExecutions.map((exec) => {
            const cfg = statusConfig[exec.status as keyof typeof statusConfig];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={exec.id}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("p-1 rounded", cfg.bg)}>
                    <StatusIcon className={cn("w-3 h-3", cfg.color, cfg.animate && "animate-spin")} />
                  </span>
                  <span className="text-xs text-foreground">{exec.workflow}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{exec.nodes} nodes</span>
                  <span>{exec.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
