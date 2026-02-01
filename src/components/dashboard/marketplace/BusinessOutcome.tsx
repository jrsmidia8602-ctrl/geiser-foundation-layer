import { Target, Building2, Rocket, Users, Package, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sellableAs = [
  { type: "SaaS Infra", icon: Building2, description: "Infraestrutura como serviço", ready: true },
  { type: "White-label Platform", icon: Package, description: "Plataforma marca própria", ready: true },
  { type: "API Marketplace", icon: Rocket, description: "Marketplace de APIs", ready: true },
  { type: "Agent Store", icon: Users, description: "Loja de agentes autônomos", ready: true },
];

const targetClients = [
  { client: "startups", count: 342, growth: "+28%", color: "bg-primary" },
  { client: "agências", count: 156, growth: "+15%", color: "bg-accent" },
  { client: "SaaS builders", count: 89, growth: "+42%", color: "bg-success" },
  { client: "criadores de IA", count: 260, growth: "+35%", color: "bg-warning" },
];

const nextLayers = [
  { id: "L11", name: "Partner Ecosystem", status: "planned" },
  { id: "L12", name: "Revenue Optimization AI", status: "planned" },
  { id: "L13", name: "Autonomous Sales Agents", status: "planned" },
];

export function BusinessOutcome() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Business Outcome</h3>
          <p className="text-xs text-muted-foreground">Oportunidades de negócio e roadmap</p>
        </div>
        <Target className="w-5 h-5 text-success" />
      </div>

      {/* Sellable As */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sellable As</h4>
        <div className="grid grid-cols-2 gap-3">
          {sellableAs.map((item) => (
            <div
              key={item.type}
              className="group p-4 rounded-xl bg-secondary/30 border border-border hover:border-success/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <item.icon className="w-5 h-5 text-primary" />
                {item.ready && <CheckCircle2 className="w-4 h-4 text-success" />}
              </div>
              <div className="font-medium text-foreground mb-1">{item.type}</div>
              <div className="text-[10px] text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Clients */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Target Clients</h4>
        <div className="grid grid-cols-2 gap-3">
          {targetClients.map((item) => (
            <div
              key={item.client}
              className="p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-foreground">{item.client}</span>
                <span className="text-success text-xs">{item.growth}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", item.color)} />
                <span className="text-lg font-bold text-foreground">{item.count}</span>
                <span className="text-[10px] text-muted-foreground">clientes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Layers */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Next Layers</h4>
        <div className="space-y-2">
          {nextLayers.map((layer) => (
            <div
              key={layer.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border opacity-60"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-primary">{layer.id}</span>
                <span className="text-sm text-foreground">{layer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {layer.status}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
