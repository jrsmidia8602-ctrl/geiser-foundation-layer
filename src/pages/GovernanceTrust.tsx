import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GovernanceModuleHeader } from "@/components/dashboard/governance/GovernanceModuleHeader";
import { IdentityAndAccess } from "@/components/dashboard/governance/IdentityAndAccess";
import { DecisionGovernance } from "@/components/dashboard/governance/DecisionGovernance";
import { EconomicGovernance } from "@/components/dashboard/governance/EconomicGovernance";
import { AuditEngine } from "@/components/dashboard/governance/AuditEngine";
import { RiskManagement } from "@/components/dashboard/governance/RiskManagement";
import { ComplianceFrameworks } from "@/components/dashboard/governance/ComplianceFrameworks";
import { TrustSignals } from "@/components/dashboard/governance/TrustSignals";
import { PolicyEngine } from "@/components/dashboard/governance/PolicyEngine";
import { IncidentManagement } from "@/components/dashboard/governance/IncidentManagement";
import { EnterpriseControls } from "@/components/dashboard/governance/EnterpriseControls";
import { GovernanceDashboards } from "@/components/dashboard/governance/GovernanceDashboards";
import { GovernanceNextModules } from "@/components/dashboard/governance/GovernanceNextModules";

const moduleData = {
  systemName: "XPEX SYSTEMS AI",
  moduleId: "GEISER_07_GOVERNANCE_TRUST",
  moduleName: "Governance, Trust & Compliance Engine",
  version: "1.0.0",
  status: "active" as const,
  description: "Camada de governança, auditoria, controle de risco e confiança para operação segura de agentes e infraestruturas inteligentes.",
};

const GovernanceTrust = () => {
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
      <GovernanceModuleHeader {...moduleData} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Governance Domains */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-primary rounded-full" />
            Governance Domains
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <IdentityAndAccess />
            <DecisionGovernance />
            <EconomicGovernance />
          </div>
        </section>

        {/* Audit & Risk */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-warning to-destructive rounded-full" />
            Audit & Risk Management
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AuditEngine />
            <RiskManagement />
          </div>
        </section>

        {/* Compliance & Trust */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-accent rounded-full" />
            Compliance & Trust
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceFrameworks />
            <TrustSignals />
          </div>
        </section>

        {/* Policy & Incidents */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-destructive rounded-full" />
            Policy & Incident Management
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PolicyEngine />
            <IncidentManagement />
          </div>
        </section>

        {/* Enterprise */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-accent to-warning rounded-full" />
            Enterprise Controls
          </h2>
          <EnterpriseControls />
        </section>

        {/* Dashboards */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-success rounded-full" />
            Dashboards & Views
          </h2>
          <GovernanceDashboards />
        </section>

        {/* Next Modules */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-success to-warning rounded-full" />
            Roadmap
          </h2>
          <GovernanceNextModules />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">GEISER_07_GOVERNANCE_TRUST v1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Depends on: GEISER_01 through GEISER_06</span>
            <span>•</span>
            <span>XPEX SYSTEMS AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GovernanceTrust;
