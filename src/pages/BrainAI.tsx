import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BrainModuleHeader } from "@/components/dashboard/brain/BrainModuleHeader";
import { DecisionEngineAdvanced } from "@/components/dashboard/brain/DecisionEngineAdvanced";
import { MemorySystem } from "@/components/dashboard/brain/MemorySystem";
import { LearningLoop } from "@/components/dashboard/brain/LearningLoop";
import { OptimizationEngine } from "@/components/dashboard/brain/OptimizationEngine";
import { EconomicGovernor } from "@/components/dashboard/brain/EconomicGovernor";
import { LLMOrchestration } from "@/components/dashboard/brain/LLMOrchestration";
import { HumanInTheLoop } from "@/components/dashboard/brain/HumanInTheLoop";
import { GovernanceHooks } from "@/components/dashboard/brain/GovernanceHooks";
import { BrainAnalytics } from "@/components/dashboard/brain/BrainAnalytics";
import { BrainUseCases } from "@/components/dashboard/brain/BrainUseCases";
import { BrainNextModules } from "@/components/dashboard/brain/BrainNextModules";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_05_BRAIN_AI",
  moduleName: "Cognitive Brain & Decision Intelligence",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada cognitiva responsável por decisões autônomas, aprendizado contínuo, otimização de custos, performance e estratégias de negócio.",
};

const BrainAI = () => {
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
      <BrainModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Decision & Memory */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Decision & Memory
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DecisionEngineAdvanced />
            <MemorySystem />
          </div>
        </section>

        {/* Learning & Optimization */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Learning & Optimization
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LearningLoop />
            <OptimizationEngine />
          </div>
        </section>

        {/* Cost & LLM Management */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-destructive rounded-full" />
            Cost & LLM Management
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EconomicGovernor />
            <LLMOrchestration />
          </div>
        </section>

        {/* Human Oversight & Governance */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-success rounded-full" />
            Human Oversight & Governance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HumanInTheLoop />
            <GovernanceHooks />
          </div>
        </section>

        {/* Analytics */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Analytics & Performance
          </h2>
          <BrainAnalytics />
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-accent rounded-full" />
            Use Cases
          </h2>
          <BrainUseCases />
        </section>

        {/* Next Modules */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-warning rounded-full" />
            Expand the Ecosystem
          </h2>
          <BrainNextModules />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">GEISER_05_BRAIN_AI v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Depends on: GEISER_01, GEISER_02, GEISER_03, GEISER_04</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrainAI;
