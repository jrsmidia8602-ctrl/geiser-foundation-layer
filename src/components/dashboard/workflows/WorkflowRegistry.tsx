import { Workflow, Play, Pause, Archive, Globe, Calendar, Zap, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

const workflows = [
  {
    id: "wf_001",
    name: "New User Onboarding",
    trigger: "api",
    status: "active",
    version: "2.1.0",
    nodes: 6,
    lastRun: "2m ago",
  },
  {
    id: "wf_002",
    name: "Order Processing Pipeline",
    trigger: "event",
    status: "active",
    version: "1.4.0",
    nodes: 8,
    lastRun: "5m ago",
  },
  {
    id: "wf_003",
    name: "AI Content Generation",
    trigger: "schedule",
    status: "active",
    version: "3.0.0",
    nodes: 5,
    lastRun: "15m ago",
  },
  {
    id: "wf_004",
    name: "Payment Reconciliation",
    trigger: "schedule",
    status: "paused",
    version: "1.0.0",
    nodes: 4,
    lastRun: "1h ago",
  },
  {
    id: "wf_005",
    name: "Legacy Data Sync",
    trigger: "manual",
    status: "archived",
    version: "0.9.0",
    nodes: 3,
    lastRun: "7d ago",
  },
];

const triggerIcons = {
  api: Globe,
  event: Zap,
  schedule: Calendar,
  manual: MousePointer,
};

const statusConfig = {
  active: { icon: Play, color: "text-success", bg: "bg-success/20", border: "border-success/30" },
  paused: { icon: Pause, color: "text-warning", bg: "bg-warning/20", border: "border-warning/30" },
  archived: { icon: Archive, color: "text-muted-foreground", bg: "bg-muted/20", border: "border-border" },
};

export function WorkflowRegistry() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <Workflow className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Workflow Registry</h3>
            <p className="text-xs text-muted-foreground">workflows collection</p>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{workflows.length} workflows</span>
      </div>

      <div className="space-y-3">
        {workflows.map((workflow) => {
          const TriggerIcon = triggerIcons[workflow.trigger as keyof typeof triggerIcons];
          const statusCfg = statusConfig[workflow.status as keyof typeof statusConfig];
          const StatusIcon = statusCfg.icon;

          return (
            <div
              key={workflow.id}
              className={cn(
                "p-4 rounded-xl border transition-all hover:bg-secondary/30",
                workflow.status === "archived" ? "opacity-50" : "",
                statusCfg.border
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn("p-1 rounded", statusCfg.bg)}>
                    <StatusIcon className={cn("w-3 h-3", statusCfg.color)} />
                  </span>
                  <span className="font-medium text-foreground">{workflow.name}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">v{workflow.version}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TriggerIcon className="w-3 h-3" />
                  <span>{workflow.trigger}</span>
                </div>
                <span>{workflow.nodes} nodes</span>
                <span>Last: {workflow.lastRun}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schema Preview */}
      <div className="mt-6 p-3 rounded-lg bg-secondary/30 border border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Schema</h4>
        <code className="text-[10px] text-muted-foreground font-mono">
          id: uuid | name: string | trigger_type: api|event|schedule|manual | status | version
        </code>
      </div>
    </div>
  );
}
