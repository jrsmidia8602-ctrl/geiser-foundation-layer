import { FileCheck, Shield, Globe, Heart, Database, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { name: "SOC2", status: "compliant", coverage: 98 },
  { name: "ISO27001", status: "compliant", coverage: 95 },
  { name: "GDPR", status: "compliant", coverage: 100 },
  { name: "LGPD", status: "compliant", coverage: 100 },
  { name: "HIPAA_ready", status: "partial", coverage: 78 },
];

const features = [
  { feature: "data_lineage", icon: Database, description: "Rastreabilidade completa de dados", enabled: true },
  { feature: "pii_handling", icon: Shield, description: "Tratamento seguro de PII", enabled: true },
  { feature: "right_to_explain", icon: Search, description: "Direito à explicação de decisões", enabled: true },
  { feature: "right_to_forget", icon: Trash2, description: "Direito ao esquecimento", enabled: true },
];

export function ComplianceFrameworks() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Compliance Frameworks</h3>
          <p className="text-xs text-muted-foreground">Frameworks de conformidade suportados</p>
        </div>
        <FileCheck className="w-5 h-5 text-success" />
      </div>

      {/* Frameworks */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Supported Frameworks</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {frameworks.map((item) => (
            <div
              key={item.name}
              className={cn(
                "p-3 rounded-xl border text-center",
                item.status === "compliant"
                  ? "border-success/30 bg-success/10"
                  : "border-warning/30 bg-warning/10"
              )}
            >
              <div className="text-lg font-bold text-foreground mb-1">{item.coverage}%</div>
              <div className="font-mono text-xs text-foreground mb-1">{item.name}</div>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full",
                item.status === "compliant"
                  ? "bg-success/20 text-success"
                  : "bg-warning/20 text-warning"
              )}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Features */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Privacy Features</h4>
        <div className="space-y-2">
          {features.map((item) => (
            <div
              key={item.feature}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-success/30 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-success/10">
                <item.icon className="w-4 h-4 text-success" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-sm text-foreground">{item.feature}</div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
