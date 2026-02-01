import { Crown, Check, Sparkles, Rocket, Store, Users, DollarSign } from "lucide-react";

export function FinalStatus() {
  const statusItems = [
    { id: "sellable", label: "Sellable", description: "Ready for commercial distribution", icon: DollarSign, enabled: true },
    { id: "white_label_ready", label: "White Label Ready", description: "Full rebrand capability", icon: Sparkles, enabled: true },
    { id: "investor_ready", label: "Investor Ready", description: "Due diligence compliant", icon: Users, enabled: true },
    { id: "marketplace_ready", label: "Marketplace Ready", description: "Listed and discoverable", icon: Store, enabled: true },
  ];

  return (
    <div className="glass-card p-6 border-2 border-warning/30 bg-gradient-to-br from-warning/5 via-transparent to-primary/5">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-warning/20 to-primary/20 border border-warning/30">
            <Crown className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Final Status</h3>
            <p className="text-xs text-muted-foreground">Production readiness checklist</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-warning/20 to-success/20 text-warning text-xs font-medium border border-warning/30">
          <Rocket className="w-3 h-3" />
          PRODUCTION READY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statusItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 border border-border hover:border-warning/30 transition-colors">
            <div className="p-2 rounded-lg bg-success/10 border border-success/20">
              <item.icon className="w-4 h-4 text-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <Check className="w-4 h-4 text-success" />
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Branding section */}
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-warning/10 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">System Positioning</h4>
            <p className="text-lg font-semibold bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent">
              The Operating System for AI Monetization
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">System Name</span>
            <div className="text-sm font-mono text-foreground">XPEX SYSTEMS AI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
