import { Layers, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  { id: "L1", name: "Identity & Auth", status: "active" },
  { id: "L2", name: "Agent Registry", status: "active" },
  { id: "L3", name: "Execution Gateway", status: "active" },
  { id: "L4", name: "Orchestration Logic", status: "partial" },
  { id: "L5", name: "Telemetry", status: "active" },
  { id: "L6", name: "Marketplace", status: "active" },
  { id: "L7", name: "Billing", status: "configured_not_live" },
  { id: "L8", name: "Autonomy", status: "dormant" },
];

const statusConfig = {
  active: { icon: CheckCircle, color: "text-success", bg: "bg-success/20", label: "Active" },
  partial: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/20", label: "Partial" },
  configured_not_live: { icon: Clock, color: "text-accent", bg: "bg-accent/20", label: "Ready" },
  dormant: { icon: XCircle, color: "text-muted-foreground", bg: "bg-secondary", label: "Dormant" },
};

export function RuntimeLayerStatus() {
  const activeCount = layers.filter(l => l.status === "active").length;
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Core Layers</h3>
            <p className="text-xs text-muted-foreground">{activeCount}/{layers.length} operational</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{Math.round((activeCount / layers.length) * 100)}%</div>
          <div className="text-[10px] text-muted-foreground uppercase">Coverage</div>
        </div>
      </div>

      <div className="space-y-2">
        {layers.map((layer) => {
          const config = statusConfig[layer.status as keyof typeof statusConfig];
          const Icon = config.icon;
          return (
            <div
              key={layer.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground w-6">{layer.id}</span>
                <span className="text-sm text-foreground">{layer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full", config.bg, config.color)}>
                  {config.label}
                </span>
                <Icon className={cn("w-4 h-4", config.color)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
