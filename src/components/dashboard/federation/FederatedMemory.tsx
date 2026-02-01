import { Database, Lock, Share2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  { name: "Private Memory", description: "Isolated per organization", icon: Lock, color: "text-destructive" },
  { name: "Shared Memory Contracts", description: "Governed data sharing", icon: Share2, color: "text-warning" },
  { name: "Read-Only External", description: "External data access", icon: Eye, color: "text-success" },
];

const controls = [
  { name: "Memory Sharing Policies", active: true },
  { name: "Audit on Access", active: true },
  { name: "Revocable Access", active: true },
];

export function FederatedMemory() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Database className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Federated Memory</h3>
          <p className="text-xs text-muted-foreground">Sovereign memory management</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Memory Modes */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Memory Modes</h4>
          <div className="space-y-2">
            {modes.map((mode) => (
              <div key={mode.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <mode.icon className={cn("w-4 h-4", mode.color)} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{mode.name}</div>
                  <div className="text-xs text-muted-foreground">{mode.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Controls */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Access Controls</h4>
          <div className="space-y-2">
            {controls.map((control) => (
              <div
                key={control.name}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 border border-border"
              >
                <span className="text-sm text-foreground">{control.name}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  control.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {control.active ? "Enabled" : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
