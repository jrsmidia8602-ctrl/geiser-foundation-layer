import { StatusBadge } from "../StatusBadge";
import { Zap, Brain, TrendingUp, Shield, Sparkles, Crown } from "lucide-react";

interface SupremeModuleHeaderProps {
  systemName: string;
  moduleId: string;
  moduleName: string;
  version: string;
  status: "active" | "inactive" | "archived";
  description: string;
}

export function SupremeModuleHeader({
  systemName,
  moduleId,
  moduleName,
  version,
  status,
  description,
}: SupremeModuleHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Supreme background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-warning/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Crown badge */}
          <div className="flex items-center gap-3 mb-6 animate-slide-up">
            <div className="p-2 rounded-lg bg-gradient-to-br from-warning/20 to-primary/20 border border-warning/30">
              <Crown className="w-6 h-6 text-warning" />
            </div>
            <span className="text-sm font-mono text-warning tracking-widest uppercase">{systemName}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-warning/50 to-transparent" />
          </div>

          {/* Main title */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="animate-slide-up animation-delay-200">
              <h1 className="text-5xl md:text-6xl font-bold mb-3">
                <span className="bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent">SUPREME</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-foreground font-light flex items-center gap-3">
                {moduleName}
                <Sparkles className="w-6 h-6 text-warning animate-pulse" />
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-slide-up animation-delay-400">
              <StatusBadge status={status} pulse />
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-mono border border-primary/30">
                v{version}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-warning/20 to-success/20 text-warning text-sm font-mono border border-warning/30 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                production_ready
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed animate-slide-up animation-delay-600">
            {description}
          </p>

          {/* Supreme stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 animate-slide-up animation-delay-600">
            {[
              { icon: Brain, label: "AI Decisions", value: "2.4M/day", color: "text-primary" },
              { icon: TrendingUp, label: "Revenue Lift", value: "+34%", color: "text-success" },
              { icon: Zap, label: "Avg Latency", value: "12ms", color: "text-accent" },
              { icon: Shield, label: "Trust Score", value: "99.8%", color: "text-warning" },
              { icon: Sparkles, label: "Active Funnels", value: "847", color: "text-primary" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center group hover:border-primary/50 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Core capabilities */}
          <div className="mt-10 p-5 rounded-xl bg-gradient-to-r from-secondary/50 via-secondary/30 to-secondary/50 border border-border animate-slide-up animation-delay-600">
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
              <Crown className="w-4 h-4 text-warning" />
              Supreme Capabilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "offer_orchestration",
                "ai_decision_engine",
                "funnel_optimization",
                "revenue_forecasting",
                "churn_prediction",
                "dynamic_pricing",
                "white_label_ready",
                "investor_grade"
              ].map((capability) => (
                <span
                  key={capability}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-mono border border-primary/20 hover:border-primary/40 transition-colors cursor-default"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
