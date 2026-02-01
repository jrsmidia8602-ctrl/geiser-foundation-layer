import { Lock, ArrowRight, Bot, Workflow, DollarSign, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const modules = [
  {
    id: "GEISER_02",
    name: "Agents & APIs",
    description: "Create and deploy intelligent agents and API endpoints",
    icon: Bot,
    color: "from-primary to-primary/50",
    path: "/agents-and-apis",
    unlocked: true,
  },
  {
    id: "GEISER_03",
    name: "Workflows",
    description: "Design complex automation workflows and pipelines",
    icon: Workflow,
    color: "from-success to-success/50",
    path: "/workflows",
    unlocked: true,
  },
  {
    id: "GEISER_04",
    name: "Monetization",
    description: "Payment integration, subscriptions, and revenue tracking",
    icon: DollarSign,
    color: "from-warning to-warning/50",
    path: "/monetization",
    unlocked: false,
  },
  {
    id: "GEISER_05",
    name: "Brain AI",
    description: "Advanced AI decision-making and learning capabilities",
    icon: Brain,
    color: "from-accent to-accent/50",
    path: "/brain-ai",
    unlocked: false,
  },
];

export function NextModules() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Unlock Next Modules</h3>
          <p className="text-xs text-muted-foreground">Expand your infrastructure capabilities</p>
        </div>
        <Lock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const CardContent = (
            <>
              {/* Background gradient */}
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", module.color)} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2 rounded-lg bg-gradient-to-br", module.color)}>
                    <module.icon className="w-4 h-4 text-background" />
                  </div>
                  <div className="flex items-center gap-2">
                    {module.unlocked && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
                        Active
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
                <div className="font-mono text-xs text-muted-foreground mb-1">{module.id}</div>
                <h4 className="font-semibold text-foreground mb-1">{module.name}</h4>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>
            </>
          );

          if (module.unlocked) {
            return (
              <Link
                key={module.id}
                to={module.path}
                className="group relative p-4 rounded-xl border border-primary/30 bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer overflow-hidden"
              >
                {CardContent}
              </Link>
            );
          }

          return (
            <div
              key={module.id}
              className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer overflow-hidden opacity-60"
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
