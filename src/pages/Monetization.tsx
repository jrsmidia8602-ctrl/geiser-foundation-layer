import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MonetizationModuleHeader } from "@/components/dashboard/monetization/MonetizationModuleHeader";
import { PlansRegistry } from "@/components/dashboard/monetization/PlansRegistry";
import { UsageMetering } from "@/components/dashboard/monetization/UsageMetering";
import { PricingEngine } from "@/components/dashboard/monetization/PricingEngine";
import { PaymentsPanel } from "@/components/dashboard/monetization/PaymentsPanel";
import { RevenueSharing } from "@/components/dashboard/monetization/RevenueSharing";
import { RevenueAnalytics } from "@/components/dashboard/monetization/RevenueAnalytics";
import { AccessControl } from "@/components/dashboard/monetization/AccessControl";
import { CompliancePanel } from "@/components/dashboard/monetization/CompliancePanel";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_04_MONETIZATION",
  moduleName: "Monetization & Billing Layer",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada responsável por monetizar agentes, APIs, workflows e infraestrutura. Suporta billing por uso, planos recorrentes e revenue sharing.",
};

const Monetization = () => {
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
      <MonetizationModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Plans & Usage */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-success rounded-full" />
            Plans & Usage
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlansRegistry />
            <UsageMetering />
          </div>
        </section>

        {/* Pricing & Payments */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-primary rounded-full" />
            Pricing & Payments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingEngine />
            <PaymentsPanel />
          </div>
        </section>

        {/* Revenue */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Revenue & Distribution
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueSharing />
            <RevenueAnalytics />
          </div>
        </section>

        {/* Access & Compliance */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-destructive to-primary rounded-full" />
            Access Control & Compliance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccessControl />
            <CompliancePanel />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">GEISER_04_MONETIZATION v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Depends on: GEISER_01, GEISER_02, GEISER_03</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Monetization;
