import { Lightbulb, Rocket, Bot, DollarSign, Brain, Building2 } from "lucide-react";

const useCases = [
  {
    title: "Auto-optimizing SaaS",
    description: "Self-tuning SaaS applications that optimize costs, performance, and user experience automatically",
    icon: Rocket,
    color: "from-primary to-accent",
  },
  {
    title: "Intelligent Agent Routing",
    description: "Smart routing of tasks to the most appropriate agents based on capabilities and availability",
    icon: Bot,
    color: "from-accent to-success",
  },
  {
    title: "AI Cost Governor",
    description: "Autonomous cost management for AI workloads with budget controls and optimization",
    icon: DollarSign,
    color: "from-warning to-destructive",
  },
  {
    title: "Decision-as-a-Service",
    description: "Expose cognitive decision-making as an API for external systems and applications",
    icon: Brain,
    color: "from-success to-primary",
  },
  {
    title: "Enterprise Autonomous Systems",
    description: "Full enterprise automation with human oversight and governance compliance",
    icon: Building2,
    color: "from-destructive to-warning",
  },
];

export function BrainUseCases() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Lightbulb className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Use Cases</h3>
            <p className="text-xs text-muted-foreground">What you can build with Brain AI</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="group p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/30 transition-all"
          >
            <div className={`p-2 rounded-lg bg-gradient-to-br ${useCase.color} w-fit mb-3`}>
              <useCase.icon className="w-5 h-5 text-background" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">{useCase.title}</h4>
            <p className="text-xs text-muted-foreground">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
