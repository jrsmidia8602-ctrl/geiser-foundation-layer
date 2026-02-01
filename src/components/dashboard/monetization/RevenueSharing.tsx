import { Users, Percent, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const participants = [
  {
    role: "platform_owner",
    name: "Platform Owner",
    share: 20,
    revenue: 2480,
    color: "text-warning",
  },
  {
    role: "agent_creator",
    name: "Agent Creators",
    share: 50,
    revenue: 6200,
    color: "text-primary",
  },
  {
    role: "workflow_creator",
    name: "Workflow Creators",
    share: 30,
    revenue: 3720,
    color: "text-accent",
  },
];

const recentDistributions = [
  { resource: "GPT Processor Agent", creator: "john@dev.com", revenue: 124.50, platformFee: 24.90, creatorShare: 99.60 },
  { resource: "Order Pipeline", creator: "jane@build.io", revenue: 89.00, platformFee: 17.80, creatorShare: 71.20 },
  { resource: "Email Automator", creator: "alex@ai.co", revenue: 56.25, platformFee: 11.25, creatorShare: 45.00 },
];

export function RevenueSharing() {
  const totalRevenue = participants.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Revenue Sharing</h3>
            <p className="text-xs text-muted-foreground">Multi-party distribution</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
          enabled: true
        </span>
      </div>

      {/* Split Visualization */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Percent className="w-3 h-3 text-muted-foreground" />
          <h4 className="text-xs font-medium text-muted-foreground">Revenue Split</h4>
        </div>
        
        {/* Visual bar */}
        <div className="h-4 rounded-full overflow-hidden flex mb-4">
          {participants.map((p) => (
            <div
              key={p.role}
              className={cn(
                "h-full transition-all",
                p.role === "platform_owner" && "bg-warning",
                p.role === "agent_creator" && "bg-primary",
                p.role === "workflow_creator" && "bg-accent"
              )}
              style={{ width: `${p.share}%` }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {participants.map((p) => (
            <div
              key={p.role}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", 
                  p.role === "platform_owner" && "bg-warning",
                  p.role === "agent_creator" && "bg-primary",
                  p.role === "workflow_creator" && "bg-accent"
                )} />
                <span className="text-xs text-foreground">{p.name}</span>
                <span className="text-[10px] text-muted-foreground">({p.share}%)</span>
              </div>
              <span className="text-xs font-bold text-success">${p.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Distributions */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Distributions</h4>
        <div className="space-y-2">
          {recentDistributions.map((dist, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{dist.resource}</span>
                <span className="text-xs font-bold text-foreground">${dist.revenue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{dist.creator}</span>
                <div className="flex items-center gap-2">
                  <span className="text-warning">-${dist.platformFee.toFixed(2)} fee</span>
                  <span className="text-success">→ ${dist.creatorShare.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
