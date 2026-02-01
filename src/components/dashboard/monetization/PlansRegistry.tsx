import { CreditCard, Check, Zap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    icon: Zap,
    color: "from-primary to-primary/50",
    popular: false,
    limits: {
      api_calls: "50,000",
      workflows: "5",
      agents: "10",
    },
    features: ["Basic analytics", "Email support", "Standard SLA"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    icon: CreditCard,
    color: "from-warning to-warning/50",
    popular: true,
    limits: {
      api_calls: "250,000",
      workflows: "25",
      agents: "50",
    },
    features: ["Advanced analytics", "Priority support", "99.9% SLA", "Custom webhooks"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    icon: Building2,
    color: "from-accent to-accent/50",
    popular: false,
    limits: {
      api_calls: "Unlimited",
      workflows: "Unlimited",
      agents: "Unlimited",
    },
    features: ["White-label", "Dedicated support", "Custom SLA", "On-premise option", "Revenue sharing"],
  },
];

const tenantStats = [
  { plan: "starter", count: 89, revenue: 2581 },
  { plan: "pro", count: 47, revenue: 4653 },
  { plan: "enterprise", count: 6, revenue: 5200 },
];

export function PlansRegistry() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/20">
            <CreditCard className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Plans & Pricing</h3>
            <p className="text-xs text-muted-foreground">Subscription tiers</p>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{plans.length} plans</span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative p-4 rounded-xl border transition-all hover:bg-secondary/30",
              plan.popular ? "border-warning/50 bg-warning/5" : "border-border"
            )}
          >
            {plan.popular && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-warning text-background text-[10px] font-bold">
                POPULAR
              </span>
            )}
            
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", plan.color)}>
                <plan.icon className="w-3 h-3 text-background" />
              </div>
              <span className="font-semibold text-foreground">{plan.name}</span>
            </div>

            <div className="mb-3">
              {plan.price ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-foreground">Custom</span>
              )}
            </div>

            <div className="space-y-1 mb-3 text-[10px] text-muted-foreground">
              <div>API Calls: {plan.limits.api_calls}</div>
              <div>Workflows: {plan.limits.workflows}</div>
              <div>Agents: {plan.limits.agents}</div>
            </div>

            <div className="space-y-1">
              {plan.features.slice(0, 3).map((feature) => (
                <div key={feature} className="flex items-center gap-1 text-[10px]">
                  <Check className="w-3 h-3 text-success" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tenant Distribution */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Tenant Distribution</h4>
        <div className="space-y-2">
          {tenantStats.map((stat) => {
            const plan = plans.find(p => p.id === stat.plan);
            return (
              <div
                key={stat.plan}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground capitalize">{stat.plan}</span>
                  <span className="text-[10px] text-muted-foreground">{stat.count} tenants</span>
                </div>
                <span className="text-xs font-bold text-success">${stat.revenue.toLocaleString()}/mo</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
