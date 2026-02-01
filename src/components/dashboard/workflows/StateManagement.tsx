import { Database, Save, RotateCcw, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const stateFeatures = [
  {
    feature: "stateful",
    label: "Stateful Execution",
    description: "Mantém estado entre steps",
    enabled: true,
    icon: Database,
  },
  {
    feature: "checkpointing",
    label: "Checkpointing",
    description: "Salva estado em cada step",
    enabled: true,
    icon: Save,
  },
  {
    feature: "resume",
    label: "Resume Support",
    description: "Retoma de falhas automaticamente",
    enabled: true,
    icon: RotateCcw,
  },
];

const workflowStates = [
  { workflow: "User Onboarding", currentNode: "email_verification", step: 3, total: 6, progress: 50 },
  { workflow: "Order Pipeline", currentNode: "payment_processing", step: 5, total: 8, progress: 62 },
  { workflow: "AI Content", currentNode: "generate_draft", step: 2, total: 5, progress: 40 },
];

const checkpoints = [
  { id: "cp_001", workflow: "Order Pipeline", node: "inventory_check", time: "2m ago" },
  { id: "cp_002", workflow: "User Onboarding", node: "profile_setup", time: "5m ago" },
  { id: "cp_003", workflow: "AI Content", node: "prompt_build", time: "10m ago" },
];

export function StateManagement() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Database className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">State Management</h3>
            <p className="text-xs text-muted-foreground">workflow_state_store</p>
          </div>
        </div>
      </div>

      {/* State Features */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stateFeatures.map((feature) => (
          <div
            key={feature.feature}
            className={cn(
              "p-3 rounded-lg border transition-all",
              feature.enabled
                ? "bg-success/10 border-success/30"
                : "bg-secondary/30 border-border"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <feature.icon className={cn("w-4 h-4", feature.enabled ? "text-success" : "text-muted-foreground")} />
              <span className="text-xs font-medium text-foreground">{feature.label}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Active Workflow States */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Active Workflow States</h4>
        <div className="space-y-3">
          {workflowStates.map((state, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/20 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{state.workflow}</span>
                <span className="text-[10px] text-muted-foreground">
                  Step {state.step}/{state.total}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{state.progress}%</span>
              </div>
              <code className="text-[10px] text-muted-foreground font-mono">
                current_node: {state.currentNode}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Checkpoints */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Checkpoints</h4>
        <div className="space-y-2">
          {checkpoints.map((cp) => (
            <div
              key={cp.id}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3 h-3 text-success" />
                <div>
                  <span className="text-xs text-foreground">{cp.workflow}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">@ {cp.node}</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">{cp.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
