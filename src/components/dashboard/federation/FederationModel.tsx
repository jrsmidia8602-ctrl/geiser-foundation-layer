import { Layers, Lock, Box, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const levels = [
  { name: "Organization", icon: Layers, description: "Top-level entity boundary" },
  { name: "Tenant", icon: Lock, description: "Isolated customer environment" },
  { name: "Workspace", icon: Box, description: "Project or team scope" },
  { name: "Agent", icon: Bot, description: "Individual execution unit" },
];

const isolation = [
  { type: "Data", mode: "hard_isolation", color: "text-destructive" },
  { type: "Memory", mode: "private_by_default", color: "text-warning" },
  { type: "Execution", mode: "sandboxed_agents", color: "text-success" },
];

export function FederationModel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Layers className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Federation Model</h3>
          <p className="text-xs text-muted-foreground">federated_intelligence_runtime</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hierarchy Levels */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Hierarchy Levels</h4>
          <div className="space-y-2">
            {levels.map((level, i) => (
              <div key={level.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
                  {i + 1}
                </div>
                <level.icon className="w-4 h-4 text-accent" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{level.name}</span>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Isolation Modes */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Isolation Controls</h4>
          <div className="grid grid-cols-3 gap-2">
            {isolation.map((item) => (
              <div key={item.type} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
                <div className={cn("text-sm font-medium mb-1", item.color)}>{item.type}</div>
                <div className="text-[10px] font-mono text-muted-foreground">{item.mode}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
