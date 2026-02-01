import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MarketplaceModuleHeader } from "@/components/dashboard/marketplace/MarketplaceModuleHeader";
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

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_06_MARKETPLACE",
  moduleName: "Agent & Infrastructure Marketplace",
  version: "1.0.0",
  status: "active" as const,
  description: "Marketplace nativo para venda, licenciamento e distribuição de agentes, APIs e infraestruturas inteligentes.",
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
        {/* Products & Vendors */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Products & Vendors
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductTypes />
            <VendorSystem />
          </div>
        </section>

        {/* Pricing & Billing */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Pricing & Billing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingModels />
            <BillingEngine />
          </div>
        </section>

        {/* Licensing & Trust */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Licensing & Trust
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LicenseManagement />
            <TrustAndQuality />
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
            <span className="text-sm text-muted-foreground font-mono">GEISER_06_MARKETPLACE v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Depends on: GEISER_01 through GEISER_05</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
