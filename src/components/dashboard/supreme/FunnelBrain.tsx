import { GitBranch, Sparkles, Filter, Target, DollarSign, Repeat, TrendingUp } from "lucide-react";

export function FunnelBrain() {
  const funnels = [
    { id: "lead-capture", label: "Lead Capture", icon: Filter, conversions: "24.3%", status: "optimized" },
    { id: "tripwire", label: "Tripwire", icon: DollarSign, conversions: "18.7%", status: "learning" },
    { id: "core-offer", label: "Core Offer", icon: Target, conversions: "12.4%", status: "optimized" },
    { id: "high-ticket", label: "High Ticket", icon: TrendingUp, conversions: "4.2%", status: "optimized" },
    { id: "recurring", label: "Recurring", icon: Repeat, conversions: "67.8%", status: "optimized" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10 border border-warning/20">
            <GitBranch className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Funnel Brain</h3>
            <p className="text-xs text-muted-foreground">Continuous AI learning</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10 text-warning text-xs">
          <Sparkles className="w-3 h-3" />
          auto_optimizing
        </span>
      </div>

      {/* Funnel visualization */}
      <div className="space-y-2">
        {funnels.map((funnel, index) => (
          <div key={funnel.id} className="relative">
            <div 
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-warning/30 transition-colors"
              style={{ marginLeft: `${index * 8}px`, marginRight: `${index * 8}px` }}
            >
              <div className="flex items-center gap-3">
                <funnel.icon className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-foreground">{funnel.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-success">{funnel.conversions}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  funnel.status === 'optimized' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-accent/10 text-accent'
                }`}>
                  {funnel.status}
                </span>
              </div>
            </div>
            {index < funnels.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 h-2 w-px bg-border" />
            )}
          </div>
        ))}
      </div>

      {/* AI optimization status */}
      <div className="mt-6 p-3 rounded-lg bg-warning/5 border border-warning/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warning animate-pulse" />
            <span className="text-sm text-foreground">AI Optimization Active</span>
          </div>
          <span className="text-xs text-muted-foreground">Next cycle: 2h 34m</span>
        </div>
      </div>
    </div>
  );
}
