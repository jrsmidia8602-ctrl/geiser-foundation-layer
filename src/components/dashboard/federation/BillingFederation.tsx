import { Receipt, Building, Split, FileText, Eye, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const models = [
  { name: "Centralized Billing", description: "Single invoice to parent org", icon: Building },
  { name: "Distributed Billing", description: "Per-org invoicing", icon: Split },
  { name: "Revenue Split", description: "Automated profit sharing", icon: DollarSign },
];

const features = [
  { name: "Cross-Org Invoicing", active: true },
  { name: "Usage Attribution", active: true },
  { name: "Cost Transparency", active: true },
];

export function BillingFederation() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-success/20">
          <Receipt className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Billing Federation</h3>
          <p className="text-xs text-muted-foreground">Multi-org financial management</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Billing Models */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Billing Models</h4>
          <div className="space-y-2">
            {models.map((model) => (
              <div key={model.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <model.icon className="w-4 h-4 text-success" />
                <div>
                  <div className="text-sm font-medium text-foreground">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Features</h4>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <span
                key={feature.name}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono border",
                  feature.active
                    ? "bg-success/10 text-success border-success/30"
                    : "bg-muted text-muted-foreground border-border"
                )}
              >
                {feature.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
