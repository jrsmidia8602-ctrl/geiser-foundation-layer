import { Bot, Zap, Link2, Brain, Layers, Play, Pause, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge";

const agents = [
  { id: "agent_001", name: "Decision Router", type: "decision", mode: "sync", status: "active", version: "1.2.0", executions: 1247 },
  { id: "agent_002", name: "Email Automator", type: "automation", mode: "async", status: "active", version: "2.0.1", executions: 892 },
  { id: "agent_003", name: "Stripe Integration", type: "integration", mode: "event_driven", status: "active", version: "1.0.0", executions: 456 },
  { id: "agent_004", name: "GPT Processor", type: "ai", mode: "async", status: "paused", version: "0.9.0", executions: 2341 },
  { id: "agent_005", name: "Workflow Orchestrator", type: "hybrid", mode: "event_driven", status: "active", version: "1.5.0", executions: 678 },
];

const typeIcons = {
  decision: Zap,
  automation: Play,
  integration: Link2,
  ai: Brain,
  hybrid: Layers,
};

const typeColors = {
  decision: "text-primary",
  automation: "text-success",
  integration: "text-accent",
  ai: "text-warning",
  hybrid: "text-primary",
};

const modeStyles = {
  sync: "bg-success/20 text-success",
  async: "bg-primary/20 text-primary",
  event_driven: "bg-accent/20 text-accent",
};

export function AgentRegistry() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Agent Registry</h3>
            <p className="text-xs text-muted-foreground font-mono">agents</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{agents.length} agents registered</span>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => {
          const Icon = typeIcons[agent.type as keyof typeof typeIcons];
          return (
            <div
              key={agent.id}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", typeColors[agent.type as keyof typeof typeColors])} />
                  <span className="font-medium text-foreground">{agent.name}</span>
                </div>
                <StatusBadge status={agent.status as "active" | "inactive"} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="font-mono">{agent.id}</span>
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", modeStyles[agent.mode as keyof typeof modeStyles])}>
                  {agent.mode.replace("_", " ")}
                </span>
                <span>v{agent.version}</span>
                <span className="ml-auto text-foreground">{agent.executions.toLocaleString()} runs</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schema preview */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono space-y-1">
          <div className="flex justify-between">
            <span>agent_type:</span>
            <span className="text-primary">decision | automation | integration | ai | hybrid</span>
          </div>
          <div className="flex justify-between">
            <span>execution_mode:</span>
            <span className="text-accent">sync | async | event_driven</span>
          </div>
        </div>
      </div>
    </div>
  );
}
