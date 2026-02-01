import { Cloud, Server, Shield, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const clouds = [
  { name: "AWS", status: "connected", color: "from-warning to-warning/50" },
  { name: "GCP", status: "connected", color: "from-primary to-primary/50" },
  { name: "Azure", status: "connected", color: "from-accent to-accent/50" },
  { name: "On-Premise", status: "available", color: "from-success to-success/50" },
  { name: "Private VPC", status: "available", color: "from-muted-foreground to-muted-foreground/50" },
];

const deploymentModes = [
  { mode: "Shared Control Plane", description: "Multi-tenant management layer", icon: Cloud },
  { mode: "Dedicated Control Plane", description: "Isolated enterprise control", icon: Server },
  { mode: "Air-Gapped", description: "Complete network isolation", icon: Shield },
];

export function MultiCloudSupport() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Cloud className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Multi-Cloud Support</h3>
          <p className="text-xs text-muted-foreground">Deploy anywhere, manage centrally</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cloud Providers */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Supported Clouds</h4>
          <div className="flex flex-wrap gap-2">
            {clouds.map((cloud) => (
              <div
                key={cloud.name}
                className={cn(
                  "px-3 py-2 rounded-lg border flex items-center gap-2",
                  cloud.status === "connected"
                    ? "bg-success/10 border-success/30"
                    : "bg-secondary/50 border-border"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full bg-gradient-to-br", cloud.color)} />
                <span className="text-sm font-medium text-foreground">{cloud.name}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded",
                  cloud.status === "connected"
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
                )}>
                  {cloud.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Modes */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Deployment Modes</h4>
          <div className="space-y-2">
            {deploymentModes.map((mode) => (
              <div key={mode.mode} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <mode.icon className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">{mode.mode}</div>
                  <div className="text-xs text-muted-foreground">{mode.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
