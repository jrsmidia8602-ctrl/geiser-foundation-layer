import { Database, Bot, Workflow, Package, User, Link, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const entityTypes = [
  { type: "agent", icon: Bot, color: "text-primary", count: 12 },
  { type: "api", icon: Link, color: "text-accent", count: 8 },
  { type: "workflow", icon: Workflow, color: "text-success", count: 5 },
  { type: "product", icon: Package, color: "text-warning", count: 3 },
  { type: "user", icon: User, color: "text-primary", count: 156 },
  { type: "integration", icon: Database, color: "text-accent", count: 7 },
  { type: "event", icon: Calendar, color: "text-success", count: 1247 },
];

export function EntityRegistry() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Entity Registry</h3>
            <p className="text-xs text-muted-foreground font-mono">entities</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">7 types registered</span>
      </div>

      <div className="space-y-3">
        {entityTypes.map((entity) => (
          <div
            key={entity.type}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <entity.icon className={cn("w-4 h-4", entity.color)} />
              <span className="font-mono text-sm text-foreground">{entity.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{entity.count}</span>
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r from-primary to-accent")}
                  style={{ width: `${Math.min((entity.count / 200) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">
          <div className="flex justify-between mb-1">
            <span>id:</span>
            <span className="text-foreground">uuid</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>status:</span>
            <span className="text-success">active | inactive | archived</span>
          </div>
          <div className="flex justify-between">
            <span>metadata:</span>
            <span className="text-foreground">json</span>
          </div>
        </div>
      </div>
    </div>
  );
}
