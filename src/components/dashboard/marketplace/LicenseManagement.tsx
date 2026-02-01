import { Key, User, Users, Tag, Server, Gauge, Clock, Lock, Power } from "lucide-react";
import { cn } from "@/lib/utils";

const licenseTypes = [
  { type: "single_tenant", icon: User, count: 423, color: "bg-primary" },
  { type: "multi_tenant", icon: Users, count: 312, color: "bg-success" },
  { type: "white_label", icon: Tag, count: 87, color: "bg-accent" },
  { type: "on_premise", icon: Server, count: 25, color: "bg-warning" },
];

const controls = [
  { control: "usage_limit", icon: Gauge, description: "Limites de uso configuráveis", active: true },
  { control: "expiration", icon: Clock, description: "Data de expiração automática", active: true },
  { control: "feature_gating", icon: Lock, description: "Restrição de features por tier", active: true },
  { control: "kill_switch", icon: Power, description: "Desativação remota de licenças", active: true },
];

export function LicenseManagement() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">License Management</h3>
          <p className="text-xs text-muted-foreground">Tipos de licença e controles</p>
        </div>
        <Key className="w-5 h-5 text-primary" />
      </div>

      {/* License Types */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">License Types</h4>
        <div className="grid grid-cols-2 gap-3">
          {licenseTypes.map((item) => (
            <div
              key={item.type}
              className="p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("p-1.5 rounded-md", item.color + "/20")}>
                  <item.icon className={cn("w-4 h-4", item.color.replace("bg-", "text-"))} />
                </div>
                <span className="text-lg font-bold text-foreground">{item.count}</span>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase">{item.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Controls</h4>
        <div className="space-y-2">
          {controls.map((item) => (
            <div
              key={item.control}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-accent/10">
                <item.icon className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs text-foreground">{item.control}</div>
                <div className="text-[10px] text-muted-foreground">{item.description}</div>
              </div>
              <div className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium",
                item.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
              )}>
                {item.active ? "active" : "inactive"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
