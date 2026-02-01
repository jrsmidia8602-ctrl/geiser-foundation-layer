import { Lock, ArrowRight, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "GEISER_08",
    name: "Enterprise Federation",
    description: "Multi-tenant federation, SSO, and cross-organization collaboration",
    icon: Globe,
    color: "from-accent to-warning",
    unlocked: false,
  },
  {
    id: "GEISER_09",
    name: "Global Runtime",
    description: "Global distributed runtime with edge deployment capabilities",
    icon: Cpu,
    color: "from-primary to-success",
    unlocked: false,
  },
];

export function GovernanceNextModules() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Next Modules Unlocked</h3>
          <p className="text-xs text-muted-foreground">Continue expanding the ecosystem</p>
        </div>
        <Lock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer overflow-hidden opacity-60"
          >
            {/* Background gradient */}
            <div
              className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                module.color
              )}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", module.color)}>
                  <module.icon className="w-4 h-4 text-background" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                    Coming Soon
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground mb-1">{module.id}</div>
              <h4 className="font-semibold text-foreground mb-1">{module.name}</h4>
              <p className="text-xs text-muted-foreground">{module.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Value Unlocked */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Value Unlocked by Governance</h4>
        <div className="flex flex-wrap gap-2">
          {["enterprise_sales", "regulated_industries", "long_term_contracts", "high_ticket_deals"].map((value) => (
            <span
              key={value}
              className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-mono border border-success/20"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
