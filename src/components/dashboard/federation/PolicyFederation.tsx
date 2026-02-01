import { FileText, ArrowDown, Shield, DollarSign, Database, Lock, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const policyTypes = [
  { type: "Security", icon: Shield, color: "from-destructive to-destructive/50" },
  { type: "Cost", icon: DollarSign, color: "from-warning to-warning/50" },
  { type: "Data", icon: Database, color: "from-primary to-primary/50" },
  { type: "Compliance", icon: Lock, color: "from-success to-success/50" },
  { type: "Execution", icon: Cpu, color: "from-accent to-accent/50" },
];

const inheritanceModel = [
  { level: "Global", description: "Platform-wide defaults", priority: 1 },
  { level: "Organization", description: "Org-specific overrides", priority: 2 },
  { level: "Workspace", description: "Project-level policies", priority: 3 },
  { level: "Agent", description: "Agent-specific rules", priority: 4 },
];

export function PolicyFederation() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-success/20">
          <FileText className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Policy Federation</h3>
          <p className="text-xs text-muted-foreground">Hierarchical policy inheritance</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Policy Types */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Policy Types</h4>
          <div className="flex flex-wrap gap-2">
            {policyTypes.map((policy) => (
              <div
                key={policy.type}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border"
              >
                <div className={cn("p-1 rounded bg-gradient-to-br", policy.color)}>
                  <policy.icon className="w-3 h-3 text-background" />
                </div>
                <span className="text-sm font-medium text-foreground">{policy.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inheritance Model */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Inheritance Model</h4>
          <div className="space-y-2">
            {inheritanceModel.map((item, i) => (
              <div key={item.level} className="relative">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
                    {item.priority}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{item.level}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
                {i < inheritanceModel.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-muted-foreground mx-auto my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
