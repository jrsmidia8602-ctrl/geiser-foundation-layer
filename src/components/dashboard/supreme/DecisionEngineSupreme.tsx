import { Brain, ArrowRight, Zap, Target, TrendingUp, Users, History, BarChart3 } from "lucide-react";

export function DecisionEngineSupreme() {
  const inputs = [
    { id: "user_behavior", label: "User Behavior", icon: Users },
    { id: "conversion_rate", label: "Conversion Rate", icon: TrendingUp },
    { id: "traffic_source", label: "Traffic Source", icon: BarChart3 },
    { id: "lead_score", label: "Lead Score", icon: Target },
    { id: "historical_performance", label: "Historical Data", icon: History },
  ];

  const outputs = [
    { id: "best_offer", label: "Best Offer", value: "Pro Annual", confidence: "94%" },
    { id: "best_agent", label: "Best Agent", value: "SalesBot v3", confidence: "89%" },
    { id: "best_price", label: "Best Price", value: "$197/mo", confidence: "91%" },
    { id: "best_funnel", label: "Best Funnel", value: "High-Ticket", confidence: "87%" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Decision Engine</h3>
            <p className="text-xs text-muted-foreground">Real-time AI optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs">
          <Zap className="w-3 h-3" />
          12ms latency
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Inputs */}
        <div className="flex-1 space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Inputs</h4>
          {inputs.map((input) => (
            <div key={input.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border">
              <input.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{input.label}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Outputs */}
        <div className="flex-1 space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Outputs</h4>
          {outputs.map((output) => (
            <div key={output.id} className="flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/20">
              <div>
                <span className="text-xs text-muted-foreground">{output.label}</span>
                <div className="text-sm font-medium text-foreground">{output.value}</div>
              </div>
              <span className="text-xs font-mono text-success">{output.confidence}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
