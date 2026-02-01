import { Bot, DollarSign, TrendingUp, Repeat, Share2 } from "lucide-react";

export function AgentMarketplacePanel() {
  const monetizationModels = [
    { id: "pay-per-call", label: "Pay Per Call", icon: DollarSign, color: "text-success" },
    { id: "subscription", label: "Subscription", icon: Repeat, color: "text-primary" },
    { id: "usage-based", label: "Usage Based", icon: TrendingUp, color: "text-accent" },
    { id: "revenue-share", label: "Revenue Share", icon: Share2, color: "text-warning" },
  ];

  const agentCategories = [
    { name: "marketing", agents: 24, revenue: "$12.4K" },
    { name: "security", agents: 18, revenue: "$8.7K" },
    { name: "analytics", agents: 31, revenue: "$15.2K" },
    { name: "automation", agents: 42, revenue: "$23.1K" },
    { name: "copywriting", agents: 15, revenue: "$6.8K" },
    { name: "sales", agents: 28, revenue: "$19.4K" },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Agent Marketplace</h3>
            <p className="text-xs text-muted-foreground">API-as-Agent monetization</p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
          158 agents
        </span>
      </div>

      {/* Monetization models */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {monetizationModels.map((model) => (
          <div key={model.id} className="p-3 rounded-lg bg-secondary/50 border border-border text-center hover:border-accent/30 transition-colors">
            <model.icon className={`w-4 h-4 ${model.color} mx-auto mb-1`} />
            <span className="text-xs text-foreground">{model.label}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Agent Categories</h4>
        <div className="grid grid-cols-2 gap-2">
          {agentCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-foreground capitalize">{category.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-success">{category.revenue}</span>
                <span className="text-xs text-muted-foreground ml-2">({category.agents})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
