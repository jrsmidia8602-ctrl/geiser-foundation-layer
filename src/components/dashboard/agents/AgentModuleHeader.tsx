import { StatusBadge } from "../StatusBadge";
import { Bot, Globe, Cpu, DollarSign } from "lucide-react";

interface AgentModuleHeaderProps {
  systemName: string;
  moduleId: string;
  moduleName: string;
  version: string;
  status: "active" | "inactive" | "archived";
  description: string;
}

export function AgentModuleHeader({
  systemName,
  moduleId,
  moduleName,
  version,
  status,
  description,
}: AgentModuleHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* System name */}
          <div className="flex items-center gap-2 mb-6 animate-slide-up">
            <Bot className="w-5 h-5 text-accent" />
            <span className="text-sm font-mono text-accent tracking-wider">{systemName}</span>
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
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono border border-accent/30">
                execution_layer
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
              { icon: Bot, label: "Active Agents", value: "5" },
              { icon: Globe, label: "API Endpoints", value: "5" },
              { icon: Cpu, label: "Runtimes", value: "3" },
              { icon: DollarSign, label: "Revenue", value: "$74.60" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Core Concepts */}
          <div className="mt-8 p-4 rounded-xl bg-secondary/30 border border-border animate-slide-up animation-delay-600">
            <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Core Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span className="text-muted-foreground">Agent = entidade com lógica, estado e capacidade de ação</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">Toda API é tratada como um agente executável</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                <span className="text-muted-foreground">Stateless by default, state loaded on demand</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                <span className="text-muted-foreground">Monetization-ready desde o início</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
