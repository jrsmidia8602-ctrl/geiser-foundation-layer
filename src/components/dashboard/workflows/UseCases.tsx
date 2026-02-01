import { Briefcase, Cpu, Building2, Bot, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    name: "Automação de Negócios",
    description: "Automatize processos manuais repetitivos",
    icon: Briefcase,
    color: "from-primary to-primary/50",
    examples: ["Aprovações", "Notificações", "Reports"],
  },
  {
    name: "Pipelines de IA",
    description: "Orquestre modelos e agentes de IA",
    icon: Cpu,
    color: "from-accent to-accent/50",
    examples: ["RAG", "Multi-agent", "Training"],
  },
  {
    name: "Processos Empresariais",
    description: "Workflows corporativos complexos",
    icon: Building2,
    color: "from-success to-success/50",
    examples: ["Onboarding", "Compliance", "Audits"],
  },
  {
    name: "Orquestração Multi-Agente",
    description: "Coordene múltiplos agentes autônomos",
    icon: Bot,
    color: "from-warning to-warning/50",
    examples: ["Swarm", "Delegation", "Consensus"],
  },
  {
    name: "SaaS Composável",
    description: "Construa produtos combinando workflows",
    icon: Layers,
    color: "from-primary to-accent",
    examples: ["White-label", "Marketplace", "APIs"],
  },
];

const valueProps = [
  "Transforma APIs em sistemas completos",
  "Remove acoplamento entre serviços",
  "Escala lógica sem reescrever código",
  "Infra vendável por workflow",
];

export function UseCases() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <Layers className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Use Cases</h3>
            <p className="text-xs text-muted-foreground">What you can build</p>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {useCases.map((useCase) => (
          <div
            key={useCase.name}
            className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", useCase.color)}>
                <useCase.icon className="w-3 h-3 text-background" />
              </div>
              <span className="font-medium text-foreground text-sm">{useCase.name}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">{useCase.description}</p>
            <div className="flex flex-wrap gap-1">
              {useCase.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20">
        <h4 className="text-xs font-medium text-foreground mb-3">Why This Matters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {valueProps.map((prop, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5" />
              <span className="text-xs text-muted-foreground">{prop}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
