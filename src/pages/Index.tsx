import { ModuleHeader } from "@/components/dashboard/ModuleHeader";
import { EntityRegistry } from "@/components/dashboard/EntityRegistry";
import { EventBus } from "@/components/dashboard/EventBus";
import { DecisionEngine } from "@/components/dashboard/DecisionEngine";
import { NeuralLog } from "@/components/dashboard/NeuralLog";
import { ArchitecturePrinciples } from "@/components/dashboard/ArchitecturePrinciples";
import { NextModules } from "@/components/dashboard/NextModules";
import { ValueProposition } from "@/components/dashboard/ValueProposition";
import { RuntimeLayerStatus } from "@/components/dashboard/runtime/RuntimeLayerStatus";
import { RuntimeAgentStats } from "@/components/dashboard/runtime/RuntimeAgentStats";
import { RuntimeInfrastructure } from "@/components/dashboard/runtime/RuntimeInfrastructure";
import { RuntimeGapsActions } from "@/components/dashboard/runtime/RuntimeGapsActions";
import { RuntimeBusinessReadiness } from "@/components/dashboard/runtime/RuntimeBusinessReadiness";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_01_CORE",
  moduleName: "Foundation Core Infrastructure",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada zero do ecossistema XPEX. Núcleo responsável por registrar entidades, orquestrar eventos, decisões e logs. Base reutilizável para criação de agentes, APIs, workflows, produtos e sistemas completos.",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <ModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Core Components Grid */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Core Components
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EntityRegistry />
            <EventBus />
            <DecisionEngine />
            <NeuralLog />
          </div>
        </section>

        {/* Architecture & Value */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            System Design
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ArchitecturePrinciples />
            <ValueProposition />
          </div>
        </section>

        {/* Runtime Status */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Runtime Self-Description
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30 uppercase">
              Live Status
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RuntimeLayerStatus />
            <RuntimeAgentStats />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RuntimeInfrastructure />
            <RuntimeGapsActions />
            <RuntimeBusinessReadiness />
          </div>
        </section>

        {/* Next Modules */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Expansion Path
          </h2>
          <NextModules />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">GEISER_01_CORE v1.0.0</span>
          </div>
          <span className="text-xs text-muted-foreground">
            XPEX SYSTEMS AI • Modular Infrastructure
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
