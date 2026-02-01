import { Users, Upload, GitBranch, DollarSign, BarChart3, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const vendorTypes = [
  { type: "internal", count: 12, color: "bg-primary" },
  { type: "partner", count: 45, color: "bg-success" },
  { type: "third_party", count: 99, color: "bg-accent" },
];

const vendorFeatures = [
  { feature: "product_upload", icon: Upload, description: "Upload e publicação de produtos" },
  { feature: "versioning", icon: GitBranch, description: "Controle de versões semântico" },
  { feature: "pricing_control", icon: DollarSign, description: "Definição de preços e modelos" },
  { feature: "analytics_dashboard", icon: BarChart3, description: "Dashboard de métricas" },
  { feature: "revenue_split", icon: Percent, description: "Configuração de revenue share" },
];

export function VendorSystem() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Vendor System</h3>
          <p className="text-xs text-muted-foreground">Tipos de vendors e funcionalidades</p>
        </div>
        <Users className="w-5 h-5 text-primary" />
      </div>

      {/* Vendor Types */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Vendor Types</h4>
        <div className="flex gap-4">
          {vendorTypes.map((vendor) => (
            <div key={vendor.type} className="flex-1 p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <div className={cn("w-3 h-3 rounded-full mx-auto mb-2", vendor.color)} />
              <div className="text-lg font-bold text-foreground">{vendor.count}</div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">{vendor.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Features */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Vendor Features</h4>
        <div className="space-y-2">
          {vendorFeatures.map((item) => (
            <div
              key={item.feature}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="p-1.5 rounded-md bg-primary/10">
                <item.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs text-foreground">{item.feature}</div>
                <div className="text-[10px] text-muted-foreground">{item.description}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
