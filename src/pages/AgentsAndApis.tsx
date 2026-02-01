import { AgentModuleHeader } from "@/components/dashboard/agents/AgentModuleHeader";
import { AgentRegistry } from "@/components/dashboard/agents/AgentRegistry";
import { APILayer } from "@/components/dashboard/agents/APILayer";
import { ExecutionEngine } from "@/components/dashboard/agents/ExecutionEngine";
import { SecurityPanel } from "@/components/dashboard/agents/SecurityPanel";
import { MonetizationHooks } from "@/components/dashboard/agents/MonetizationHooks";
import { EventsEmitted } from "@/components/dashboard/agents/EventsEmitted";
import { NextModules } from "@/components/dashboard/NextModules";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_02_AGENTS_AND_APIS",
  moduleName: "Agents & API Runtime Layer",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada responsável por transformar entidades em agentes executáveis e APIs vivas. Permite criar, versionar, executar, pausar e monetizar agentes como serviços.",
};

const AgentsAndApis = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to GEISER_01_CORE</span>
        </Link>
      </div>

      {/* Header */}
      <AgentModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Agent & API Components */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Agent Runtime
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AgentRegistry />
            <APILayer />
          </div>
        </section>

        {/* Execution & Security */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Execution & Security
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutionEngine />
            <SecurityPanel />
          </div>
        </section>

        {/* Monetization & Events */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-success rounded-full" />
            Monetization & Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonetizationHooks />
            <EventsEmitted />
          </div>
        </section>

        {/* Dependencies */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-accent rounded-full" />
            Dependencies
          </h2>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
              >
                GEISER_01_CORE
              </Link>
              <span className="text-muted-foreground text-sm">→ Required for entity registry, event bus, and logging</span>
            </div>
          </div>
        </section>

        {/* Next Modules */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
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
            <span className="text-sm text-muted-foreground font-mono">GEISER_02_AGENTS_AND_APIS v1.0.0</span>
          </div>
          <span className="text-xs text-muted-foreground">
            XPEX SYSTEMS AI • Modular Infrastructure
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AgentsAndApis;
