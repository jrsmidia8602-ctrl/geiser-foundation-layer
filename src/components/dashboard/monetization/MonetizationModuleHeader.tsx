import { StatusBadge } from "../StatusBadge";
import { DollarSign, TrendingUp, CreditCard, Users } from "lucide-react";

interface MonetizationModuleHeaderProps {
  systemName: string;
  moduleId: string;
  moduleName: string;
  version: string;
  status: "active" | "inactive" | "archived";
  description: string;
}

export function MonetizationModuleHeader({
  systemName,
  moduleId,
  moduleName,
  version,
  status,
  description,
}: MonetizationModuleHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-warning/10 via-transparent to-success/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warning/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* System name */}
          <div className="flex items-center gap-2 mb-6 animate-slide-up">
            <DollarSign className="w-5 h-5 text-warning" />
            <span className="text-sm font-mono text-warning tracking-wider">{systemName}</span>
          </div>

          {/* Main title */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="animate-slide-up animation-delay-200">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-gradient">{moduleId.split('_')[0]}</span>
                <span className="text-foreground">_{moduleId.split('_').slice(1).join('_')}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
                {moduleName}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-slide-up animation-delay-400">
              <StatusBadge status={status} pulse />
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono border border-border">
                v{version}
              </span>
              <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-mono border border-warning/30">
                revenue_infrastructure
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed animate-slide-up animation-delay-600">
            {description}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 animate-slide-up animation-delay-600">
            {[
              { icon: DollarSign, label: "MRR", value: "$12.4K" },
              { icon: Users, label: "Active Tenants", value: "142" },
              { icon: TrendingUp, label: "Growth", value: "+18%" },
              { icon: CreditCard, label: "Plans", value: "3" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Monetization Models */}
          <div className="mt-8 p-4 rounded-xl bg-secondary/30 border border-border animate-slide-up animation-delay-600">
            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Monetization Models</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "pay_per_call",
                "pay_per_workflow",
                "subscription",
                "usage_based",
                "enterprise_license",
                "white_label"
              ].map((model) => (
                <span
                  key={model}
                  className="px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-mono border border-warning/20"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
