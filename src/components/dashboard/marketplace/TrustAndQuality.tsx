import { Shield, TrendingUp, Target, DollarSign, ThumbsUp, BadgeCheck, Building, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const scoringMetrics = [
  { metric: "usage_volume", icon: TrendingUp, weight: 30, color: "text-primary" },
  { metric: "success_rate", icon: Target, weight: 30, color: "text-success" },
  { metric: "cost_efficiency", icon: DollarSign, weight: 20, color: "text-warning" },
  { metric: "user_feedback", icon: ThumbsUp, weight: 20, color: "text-accent" },
];

const badges = [
  { badge: "verified_agent", icon: BadgeCheck, color: "from-primary to-accent", count: 234 },
  { badge: "enterprise_ready", icon: Building, color: "from-success to-primary", count: 89 },
  { badge: "cost_optimized", icon: DollarSign, color: "from-warning to-success", count: 156 },
  { badge: "high_accuracy", icon: Award, color: "from-accent to-primary", count: 178 },
];

export function TrustAndQuality() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Trust & Quality</h3>
          <p className="text-xs text-muted-foreground">Sistema de pontuação e badges</p>
        </div>
        <Shield className="w-5 h-5 text-primary" />
      </div>

      {/* Scoring System */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Scoring System</h4>
        <div className="space-y-3">
          {scoringMetrics.map((item) => (
            <div key={item.metric} className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4 shrink-0", item.color)} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-foreground">{item.metric}</span>
                  <span className="text-xs text-muted-foreground">{item.weight}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", item.color.replace("text-", "bg-"))}
                    style={{ width: `${item.weight}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Quality Badges</h4>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((item) => (
            <div
              key={item.badge}
              className="group relative p-3 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", item.color)} />
              
              <div className="relative z-10 flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", item.color)}>
                  <item.icon className="w-3.5 h-3.5 text-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-muted-foreground truncate">{item.badge}</div>
                  <div className="text-sm font-bold text-foreground">{item.count} products</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
