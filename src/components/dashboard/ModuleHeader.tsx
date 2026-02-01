import { StatusBadge } from "./StatusBadge";
import { Cpu, Layers, Zap } from "lucide-react";

interface ModuleHeaderProps {
  systemName: string;
  moduleId: string;
  moduleName: string;
  version: string;
  status: "active" | "inactive" | "archived";
  description: string;
}

export function ModuleHeader({
  systemName,
  moduleId,
  moduleName,
  version,
  status,
  description,
}: ModuleHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* System name */}
          <div className="flex items-center gap-2 mb-6 animate-slide-up">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary tracking-wider">{systemName}</span>
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
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed animate-slide-up animation-delay-600">
            {description}
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 animate-slide-up animation-delay-600">
            {[
              { icon: Layers, label: "Components", value: "4" },
              { icon: Zap, label: "Event Types", value: "5" },
              { icon: Cpu, label: "Entity Types", value: "7" },
              { icon: Layers, label: "Next Modules", value: "4" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
