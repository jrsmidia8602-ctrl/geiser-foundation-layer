import { Lock, ArrowRight, Cpu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "GEISER_09",
    name: "Global Runtime",
    description: "Edge deployment, global CDN, and distributed execution at scale",
    icon: Cpu,
    color: "from-primary to-success",
    unlocked: false,
  },
];

export function FederationNextModules() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Next Modules</h3>
          <p className="text-xs text-muted-foreground">Complete the ecosystem</p>
        </div>
        <Lock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer overflow-hidden opacity-60"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", module.color)} />

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

      {/* Final State */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 via-primary/10 to-success/10 border border-accent/20">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Final State</h4>
        </div>
        <div className="font-mono text-lg font-bold text-gradient mb-2">XPEX_AGENTOS_GLOBAL_INFRA</div>
        <p className="text-xs text-muted-foreground">Complete enterprise-grade global agent operating system</p>
      </div>

      {/* Value Unlocked */}
      <div className="mt-4 p-4 rounded-xl bg-secondary/30 border border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Value Unlocked</h4>
        <div className="flex flex-wrap gap-2">
          {["global_enterprise_contracts", "government_deals", "multi_region_compliance", "high_margin_licensing"].map((value) => (
            <span
              key={value}
              className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono border border-accent/20"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
