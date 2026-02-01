import { Gift, Sparkles, ArrowUpRight, Zap, Target, RefreshCw } from "lucide-react";

export function OfferOrchestrator() {
  const features = [
    { id: "dynamic-offer-selection", label: "Dynamic Selection", description: "AI selects optimal offer in real-time", icon: Target },
    { id: "contextual-upsell", label: "Contextual Upsell", description: "Smart upsells based on user journey", icon: ArrowUpRight },
    { id: "cross-sell-automation", label: "Cross-sell Auto", description: "Automated complementary offers", icon: RefreshCw },
    { id: "pricing-adaptation", label: "Pricing Adaptation", description: "Dynamic pricing per user segment", icon: Zap },
  ];

  const activeOffers = [
    { name: "Pro Annual Plan", conversion: "12.4%", status: "high_performance" },
    { name: "Agency Bundle", conversion: "8.7%", status: "optimizing" },
    { name: "Enterprise Trial", conversion: "23.1%", status: "high_performance" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Offer Orchestrator</h3>
            <p className="text-xs text-muted-foreground">AI-driven offer selection</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs">
          <Sparkles className="w-3 h-3" />
          ai_powered
        </span>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map((feature) => (
          <div key={feature.id} className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <feature.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{feature.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Active offers */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Offers</h4>
        {activeOffers.map((offer, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
            <span className="text-sm text-foreground">{offer.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-success">{offer.conversion}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                offer.status === 'high_performance' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                {offer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
