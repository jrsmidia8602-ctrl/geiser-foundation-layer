import { NavLink } from "@/components/NavLink";
import { FederationModuleHeader } from "@/components/dashboard/federation/FederationModuleHeader";
import { FederationModel } from "@/components/dashboard/federation/FederationModel";
import { MultiCloudSupport } from "@/components/dashboard/federation/MultiCloudSupport";
import { GlobalRuntime } from "@/components/dashboard/federation/GlobalRuntime";
import { FederatedEventBus } from "@/components/dashboard/federation/FederatedEventBus";
import { FederatedMemory } from "@/components/dashboard/federation/FederatedMemory";
import { PolicyFederation } from "@/components/dashboard/federation/PolicyFederation";
import { CrossOrgCollaboration } from "@/components/dashboard/federation/CrossOrgCollaboration";
import { EnterpriseSso } from "@/components/dashboard/federation/EnterpriseSso";
import { BillingFederation } from "@/components/dashboard/federation/BillingFederation";
import { ComplianceLegal } from "@/components/dashboard/federation/ComplianceLegal";
import { EnterpriseDashboards } from "@/components/dashboard/federation/EnterpriseDashboards";
import { FederationUseCases } from "@/components/dashboard/federation/FederationUseCases";
import { FederationNextModules } from "@/components/dashboard/federation/FederationNextModules";

const EnterpriseFederation = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <NavLink to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Core</NavLink>
              <NavLink to="/agents-and-apis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Agents</NavLink>
              <NavLink to="/workflows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Workflows</NavLink>
              <NavLink to="/monetization" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Monetization</NavLink>
              <NavLink to="/brain-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Brain AI</NavLink>
              <NavLink to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Marketplace</NavLink>
              <NavLink to="/governance-trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Governance</NavLink>
              <NavLink to="/enterprise-federation" className="text-sm text-foreground font-medium" activeClassName="text-primary">Federation</NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <FederationModuleHeader
        systemName="XPEX SYSTEMS AI"
        moduleId="GEISER_08"
        moduleName="Enterprise Federation & Global Runtime"
        version="1.0.0"
        status="active"
        description="Camada de federação enterprise que permite múltiplas organizações, clouds e regiões operarem agentes de forma isolada, sincronizada e soberana."
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Federation Core */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Federation Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FederationModel />
            <MultiCloudSupport />
            <GlobalRuntime />
          </div>
        </section>

        {/* Communication & Memory */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Communication & Memory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FederatedEventBus />
            <FederatedMemory />
          </div>
        </section>

        {/* Policy & Collaboration */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Policy & Collaboration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PolicyFederation />
            <CrossOrgCollaboration />
          </div>
        </section>

        {/* Enterprise Features */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EnterpriseSso />
            <BillingFederation />
            <ComplianceLegal />
          </div>
        </section>

        {/* Dashboards */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Enterprise Dashboards</h2>
          <EnterpriseDashboards />
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Use Cases</h2>
          <FederationUseCases />
        </section>

        {/* Next Modules */}
        <section>
          <FederationNextModules />
        </section>
      </main>
    </div>
  );
};

export default EnterpriseFederation;
