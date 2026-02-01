import { Scale, Server, Globe, Zap, ArrowUpRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const scalabilityFeatures = [
  { feature: "horizontal_scaling", icon: ArrowUpRight, description: "Escala horizontal automática", status: "active", value: "auto" },
  { feature: "auto_scale", icon: Scale, description: "Auto-scaling baseado em demanda", status: "active", value: "enabled" },
  { feature: "edge_ready", icon: Globe, description: "Deploy em edge locations", status: "active", value: "12 regions" },
];

const currentLoad = [
  { region: "US-East", load: 78, instances: 24, status: "healthy" },
  { region: "EU-West", load: 45, instances: 12, status: "healthy" },
  { region: "LATAM", load: 62, instances: 8, status: "scaling" },
  { region: "ASIA-Pacific", load: 34, instances: 6, status: "healthy" },
];

export function ScalabilityPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Scalability</h3>
          <p className="text-xs text-muted-foreground">Configuração de escala e distribuição</p>
        </div>
        <Scale className="w-5 h-5 text-primary" />
      </div>

      {/* Scalability Features */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Scale Configuration</h4>
        <div className="grid grid-cols-3 gap-3">
          {scalabilityFeatures.map((item) => (
            <div
              key={item.feature}
              className="p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <item.icon className="w-5 h-5 text-primary mb-2" />
              <div className="font-mono text-xs text-foreground uppercase mb-1">{item.feature.replace(/_/g, " ")}</div>
              <div className="text-[10px] text-muted-foreground mb-2">{item.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{item.value}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Load */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Regional Load</h4>
        <div className="space-y-3">
          {currentLoad.map((region) => (
            <div
              key={region.region}
              className="p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{region.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{region.instances} instances</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full",
                    region.status === "healthy" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                  )}>
                    {region.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      region.load > 70 ? "bg-warning" : "bg-success"
                    )}
                    style={{ width: `${region.load}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-foreground w-12 text-right">{region.load}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
