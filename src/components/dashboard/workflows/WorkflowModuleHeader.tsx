import { StatusBadge } from "../StatusBadge";
import { Workflow, GitBranch, Clock, Zap } from "lucide-react";

interface WorkflowModuleHeaderProps {
  systemName: string;
  moduleId: string;
  moduleName: string;
  version: string;
  status: "active" | "inactive" | "archived";
  description: string;
}

export function WorkflowModuleHeader({
  systemName,
  moduleId,
  moduleName,
  version,
  status,
  description,
}: WorkflowModuleHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* System name */}
          <div className="flex items-center gap-2 mb-6 animate-slide-up">
            <Workflow className="w-5 h-5 text-success" />
            <span className="text-sm font-mono text-success tracking-wider">{systemName}</span>
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
              <span className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-mono border border-success/30">
                orchestration_layer
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
              { icon: Workflow, label: "Active Workflows", value: "8" },
              { icon: GitBranch, label: "Node Types", value: "7" },
              { icon: Clock, label: "Triggers", value: "4" },
              { icon: Zap, label: "Executions/h", value: "142" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-success mx-auto mb-2" />
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
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                <span className="text-muted-foreground">Workflow = sequência lógica de agentes com regras e estados</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span className="text-muted-foreground">Event-driven: fluxos disparam via eventos ou triggers</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">Human-optional: automação total ou com aprovação humana</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2" />
                <span className="text-muted-foreground">Deterministic flows: resultados previsíveis e auditáveis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
