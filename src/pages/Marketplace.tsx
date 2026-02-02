import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MarketplaceModuleHeader } from "@/components/dashboard/marketplace/MarketplaceModuleHeader";
import { AgentCatalog } from "@/components/dashboard/marketplace/AgentCatalog";
import { ProductTypes } from "@/components/dashboard/marketplace/ProductTypes";
import { VendorSystem } from "@/components/dashboard/marketplace/VendorSystem";
import { PricingModels } from "@/components/dashboard/marketplace/PricingModels";
import { BillingEngine } from "@/components/dashboard/marketplace/BillingEngine";
import { LicenseManagement } from "@/components/dashboard/marketplace/LicenseManagement";
import { TrustAndQuality } from "@/components/dashboard/marketplace/TrustAndQuality";
import { DiscoveryEngine } from "@/components/dashboard/marketplace/DiscoveryEngine";
import { RevenueOptimization } from "@/components/dashboard/marketplace/RevenueOptimization";
import { MarketplaceAnalytics } from "@/components/dashboard/marketplace/MarketplaceAnalytics";
import { BuyerProfiles } from "@/components/dashboard/marketplace/BuyerProfiles";
import { MarketplaceNextModules } from "@/components/dashboard/marketplace/MarketplaceNextModules";
import { ExecutionGateway } from "@/components/dashboard/marketplace/ExecutionGateway";
import { TelemetryMetrics } from "@/components/dashboard/marketplace/TelemetryMetrics";
import { SecurityPanel } from "@/components/dashboard/marketplace/SecurityPanel";
import { ScalabilityPanel } from "@/components/dashboard/marketplace/ScalabilityPanel";
import { IntegrationsHub } from "@/components/dashboard/marketplace/IntegrationsHub";
import { MultiTenancyPanel } from "@/components/dashboard/marketplace/MultiTenancyPanel";
import { BusinessOutcome } from "@/components/dashboard/marketplace/BusinessOutcome";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "XPEX_MARKETPLACE_CORE",
  moduleName: "XPEX Agent Marketplace",
  version: "10.0.0",
  status: "active" as const,
  description: "Marketplace de APIs e agentes autônomos como produtos de infraestrutura, com billing, licenciamento e orquestração nativa.",
};

const Marketplace = () => {
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
      <MarketplaceModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Agent Catalog - Live from DB */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            🔥 Agent Catalog
          </h2>
          <AgentCatalog />
        </section>

        {/* Agent Registry & Products */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Agent Registry & Products
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductTypes />
            <VendorSystem />
          </div>
        </section>

        {/* Billing Engine */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Billing Engine
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingModels />
            <BillingEngine />
          </div>
        </section>

        {/* License Manager */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            License Manager
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LicenseManagement />
            <TrustAndQuality />
          </div>
        </section>

        {/* Execution Gateway */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-primary rounded-full" />
            Execution Gateway
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <ExecutionGateway />
          </div>
        </section>

        {/* Telemetry & Metrics */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-warning rounded-full" />
            Telemetry & Metrics
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <TelemetryMetrics />
          </div>
        </section>

        {/* Security & Scalability */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-accent rounded-full" />
            Security & Scalability
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SecurityPanel />
            <ScalabilityPanel />
          </div>
        </section>

        {/* Integrations & Multi-Tenancy */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-warning rounded-full" />
            Integrations & Multi-Tenancy
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IntegrationsHub />
            <MultiTenancyPanel />
          </div>
        </section>

        {/* Discovery & Optimization */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Discovery & Optimization
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DiscoveryEngine />
            <RevenueOptimization />
          </div>
        </section>

        {/* Analytics */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-success rounded-full" />
            Analytics & Segments
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <MarketplaceAnalytics />
            <BuyerProfiles />
          </div>
        </section>

        {/* Business Outcome */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Business Outcome
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <BusinessOutcome />
          </div>
        </section>

        {/* Next Modules */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-warning rounded-full" />
            Roadmap
          </h2>
          <MarketplaceNextModules />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">XPEX_MARKETPLACE_CORE v10.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Layer: L10_MONETIZATION</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
