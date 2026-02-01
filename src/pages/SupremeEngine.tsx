import { Link } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { SupremeModuleHeader } from "@/components/dashboard/supreme/SupremeModuleHeader";
import { OfferOrchestrator } from "@/components/dashboard/supreme/OfferOrchestrator";
import { AgentMarketplacePanel } from "@/components/dashboard/supreme/AgentMarketplacePanel";
import { DecisionEngineSupreme } from "@/components/dashboard/supreme/DecisionEngineSupreme";
import { FunnelBrain } from "@/components/dashboard/supreme/FunnelBrain";
import { IntegrationsPanel } from "@/components/dashboard/supreme/IntegrationsPanel";
import { AnalyticsDashboard } from "@/components/dashboard/supreme/AnalyticsDashboard";
import { AutomationRules } from "@/components/dashboard/supreme/AutomationRules";
import { SecurityStatus } from "@/components/dashboard/supreme/SecurityStatus";
import { DeploymentStatus } from "@/components/dashboard/supreme/DeploymentStatus";
import { FinalStatus } from "@/components/dashboard/supreme/FinalStatus";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "XPEX_SUPREME_09",
  moduleName: "Monetization Engine",
  version: "9.0.0",
  status: "active" as const,
  description: "Motor supremo de monetização, decisão e escala para ecossistemas de agentes e APIs inteligentes. The Operating System for AI Monetization.",
};

const SupremeEngine = () => {
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
      <SupremeModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Core AI Modules */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Core AI Modules
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <OfferOrchestrator />
            <AgentMarketplacePanel />
          </div>
          <DecisionEngineSupreme />
        </section>

        {/* Funnel & Automation */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Funnel & Automation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FunnelBrain />
            <AutomationRules />
          </div>
        </section>

        {/* Analytics & Integrations */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Analytics & Integrations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsDashboard />
            <IntegrationsPanel />
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Infrastructure & Security
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SecurityStatus />
            <DeploymentStatus />
          </div>
        </section>

        {/* Final Status */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-primary rounded-full" />
            <Crown className="w-4 h-4 text-warning" />
            Production Status
          </h2>
          <FinalStatus />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-warning animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">XPEX_SUPREME_09 v9.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>The Operating System for AI Monetization</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupremeEngine;
