import { Globe, Zap, MapPin, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const regions = [
  { code: "US", name: "United States", latency: "12ms", status: "active", agents: 847 },
  { code: "EU", name: "Europe", latency: "18ms", status: "active", agents: 562 },
  { code: "LATAM", name: "Latin America", latency: "25ms", status: "active", agents: 234 },
  { code: "ASIA", name: "Asia Pacific", latency: "32ms", status: "active", agents: 421 },
];

const features = [
  { name: "Regional Agent Execution", icon: Zap, active: true },
  { name: "Latency-Based Routing", icon: MapPin, active: true },
  { name: "Geo-Fencing", icon: Globe, active: true },
  { name: "Automatic Failover", icon: RefreshCw, active: true },
];

export function GlobalRuntime() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Globe className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Global Runtime</h3>
          <p className="text-xs text-muted-foreground">Distributed execution across regions</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Regions */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Active Regions</h4>
          <div className="grid grid-cols-2 gap-3">
            {regions.map((region) => (
              <div key={region.code} className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="font-mono text-sm font-bold text-foreground">{region.code}</span>
                  </div>
                  <span className="text-xs text-success">{region.latency}</span>
                </div>
                <div className="text-xs text-muted-foreground">{region.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-accent font-medium">{region.agents}</span> agents
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Runtime Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg border",
                  feature.active
                    ? "bg-success/10 border-success/30"
                    : "bg-secondary/50 border-border"
                )}
              >
                <feature.icon className={cn("w-3 h-3", feature.active ? "text-success" : "text-muted-foreground")} />
                <span className="text-xs text-foreground">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
