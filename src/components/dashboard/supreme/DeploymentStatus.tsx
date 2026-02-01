import { Cloud, Server, GitBranch, Check, Zap, Globe, RefreshCw } from "lucide-react";

export function DeploymentStatus() {
  const platforms = [
    { id: "vercel", name: "Vercel", status: "deployed", region: "Global Edge", icon: "▲" },
    { id: "cloudflare", name: "Cloudflare", status: "deployed", region: "Workers", icon: "☁" },
    { id: "aws", name: "AWS", status: "ready", region: "Multi-Region", icon: "λ" },
  ];

  const deploymentFeatures = [
    { label: "CI/CD Pipeline", status: "enabled" },
    { label: "Auto-Scaling", status: "enabled" },
    { label: "Zero-Downtime Deploy", status: "enabled" },
    { label: "Rollback Ready", status: "enabled" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Deployment</h3>
            <p className="text-xs text-muted-foreground">Multi-platform infrastructure</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs">
          <Zap className="w-3 h-3" />
          all systems go
        </span>
      </div>

      {/* Platforms */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
            <div className="text-2xl mb-1">{platform.icon}</div>
            <div className="text-sm font-medium text-foreground">{platform.name}</div>
            <div className="text-xs text-muted-foreground">{platform.region}</div>
            <span className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-xs ${
              platform.status === 'deployed' 
                ? 'bg-success/10 text-success' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {platform.status === 'deployed' && <Check className="w-3 h-3" />}
              {platform.status}
            </span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">DevOps Features</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {deploymentFeatures.map((feature) => (
            <div key={feature.label} className="flex items-center gap-2 text-xs">
              <Check className="w-3 h-3 text-success" />
              <span className="text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
