import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WorkflowModuleHeader } from "@/components/dashboard/workflows/WorkflowModuleHeader";
import { WorkflowRegistry } from "@/components/dashboard/workflows/WorkflowRegistry";
import { NodeTypes } from "@/components/dashboard/workflows/NodeTypes";
import { ExecutionModel } from "@/components/dashboard/workflows/ExecutionModel";
import { Triggers } from "@/components/dashboard/workflows/Triggers";
import { StateManagement } from "@/components/dashboard/workflows/StateManagement";
import { Observability } from "@/components/dashboard/workflows/Observability";
import { WorkflowEvents } from "@/components/dashboard/workflows/WorkflowEvents";
import { UseCases } from "@/components/dashboard/workflows/UseCases";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_03_WORKFLOWS",
  moduleName: "Workflows & Orchestration Layer",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada responsável por orquestrar agentes e APIs em fluxos encadeados, condicionais e autônomos. Permite criar sistemas completos sem acoplamento direto.",
};

const Workflows = () => {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Core
        </Link>
      </div>

      {/* Header */}
      <WorkflowModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Registry & Nodes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-accent rounded-full" />
            Workflow Components
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkflowRegistry />
            <NodeTypes />
          </div>
        </section>

        {/* Execution & Triggers */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-warning rounded-full" />
            Execution & Triggers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutionModel />
            <Triggers />
          </div>
        </section>

        {/* State & Observability */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-success rounded-full" />
            State & Observability
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StateManagement />
            <Observability />
          </div>
        </section>

        {/* Events */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-primary rounded-full" />
            Event Integration
          </h2>
          <WorkflowEvents />
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-accent rounded-full" />
            Use Cases & Value
          </h2>
          <UseCases />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">GEISER_03_WORKFLOWS v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Depends on: GEISER_01_CORE, GEISER_02_AGENTS</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Workflows;
