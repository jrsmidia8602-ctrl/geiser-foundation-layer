import { FileCheck, Shield, Globe, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const complianceFeatures = [
  {
    feature: "audit_logs",
    name: "Audit Logs",
    description: "Registro completo de todas as transações",
    icon: FileCheck,
    enabled: true,
  },
  {
    feature: "tax_ready",
    name: "Tax Ready",
    description: "Integração com sistemas fiscais",
    icon: Shield,
    enabled: true,
  },
  {
    feature: "gdpr_support",
    name: "GDPR Support",
    description: "Conformidade com regulamentações europeias",
    icon: Globe,
    enabled: true,
  },
];

const recentAuditLogs = [
  { action: "payment.success", tenant: "Acme Corp", amount: 99.00, timestamp: "2m ago" },
  { action: "subscription.renewed", tenant: "TechStart", amount: 29.00, timestamp: "1h ago" },
  { action: "invoice.generated", tenant: "DataFlow", amount: 149.00, timestamp: "3h ago" },
  { action: "refund.processed", tenant: "OldClient", amount: -50.00, timestamp: "1d ago" },
];

const useCases = [
  "Venda de infraestrutura",
  "SaaS por agentes",
  "Marketplace de APIs",
  "Licenciamento enterprise",
  "White-label AI systems",
];

export function CompliancePanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <FileCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Compliance & Audit</h3>
            <p className="text-xs text-muted-foreground">Regulatory compliance</p>
          </div>
        </div>
      </div>

      {/* Compliance Features */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {complianceFeatures.map((feature) => (
          <div
            key={feature.feature}
            className={cn(
              "p-3 rounded-xl border transition-all",
              feature.enabled
                ? "bg-success/10 border-success/30"
                : "bg-secondary/30 border-border"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <feature.icon className={cn(
                "w-4 h-4",
                feature.enabled ? "text-success" : "text-muted-foreground"
              )} />
              <span className="text-xs font-medium text-foreground">{feature.name}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Audit Logs */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Audit Logs</h4>
        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2">
          {recentAuditLogs.map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-2">
                <code className="text-[10px] font-mono text-primary">{log.action}</code>
                <span className="text-xs text-muted-foreground">{log.tenant}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-medium",
                  log.amount >= 0 ? "text-success" : "text-destructive"
                )}>
                  {log.amount >= 0 ? "+" : ""}${Math.abs(log.amount).toFixed(2)}
                </span>
                <span className="text-[10px] text-muted-foreground">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-success/10 border border-warning/20">
        <h4 className="text-xs font-medium text-foreground mb-3">Use Cases</h4>
        <div className="flex flex-wrap gap-2">
          {useCases.map((useCase) => (
            <div key={useCase} className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-success" />
              <span className="text-[10px] text-muted-foreground">{useCase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
