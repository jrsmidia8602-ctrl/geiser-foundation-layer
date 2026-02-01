import { Bot, Zap, Workflow, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const productTypes = [
  {
    type: "agent",
    icon: Bot,
    description: "Agentes autônomos prontos para executar tarefas específicas",
    color: "from-primary to-primary/50",
    count: 342,
    examples: ["Customer Support Agent", "Data Analyst Agent", "Code Review Agent"],
  },
  {
    type: "api",
    icon: Zap,
    description: "APIs inteligentes encapsuladas como serviços cognitivos",
    color: "from-accent to-accent/50",
    count: 215,
    examples: ["Sentiment Analysis API", "Document Parser API", "Translation API"],
  },
  {
    type: "workflow",
    icon: Workflow,
    description: "Fluxos de automação completos e reutilizáveis",
    color: "from-success to-success/50",
    count: 189,
    examples: ["Lead Qualification Flow", "Invoice Processing", "Content Pipeline"],
  },
  {
    type: "infra_bundle",
    icon: Package,
    description: "Pacotes de infraestrutura com agentes + memória + governança",
    color: "from-warning to-warning/50",
    count: 101,
    examples: ["Enterprise AI Stack", "Startup Bundle", "Agency Kit"],
  },
];

export function ProductTypes() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Product Types</h3>
          <p className="text-xs text-muted-foreground">Tipos de produtos disponíveis no marketplace</p>
        </div>
        <Package className="w-5 h-5 text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {productTypes.map((product) => (
          <div
            key={product.type}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50 transition-all overflow-hidden"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", product.color)} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", product.color)}>
                  <product.icon className="w-4 h-4 text-background" />
                </div>
                <span className="text-lg font-bold text-foreground">{product.count}</span>
              </div>
              
              <div className="font-mono text-xs text-muted-foreground mb-1 uppercase">{product.type}</div>
              <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {product.examples.map((example) => (
                  <span
                    key={example}
                    className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] border border-border"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
