import { Scale, MapPin, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { 
    name: "Regional Compliance Enforcement", 
    description: "Automatic policy enforcement per region",
    icon: MapPin,
    active: true
  },
  { 
    name: "Data Residency Rules", 
    description: "Ensure data stays in designated regions",
    icon: Shield,
    active: true
  },
  { 
    name: "Cross-Border Controls", 
    description: "Manage international data transfers",
    icon: Globe,
    active: true
  },
];

const complianceStatus = [
  { region: "US", frameworks: ["SOC2", "HIPAA"], status: "compliant" },
  { region: "EU", frameworks: ["GDPR", "ISO27001"], status: "compliant" },
  { region: "LATAM", frameworks: ["LGPD"], status: "compliant" },
  { region: "ASIA", frameworks: ["Custom"], status: "pending" },
];

export function ComplianceLegal() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Scale className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Compliance & Legal</h3>
          <p className="text-xs text-muted-foreground">Global regulatory adherence</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Features */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Features</h4>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                <feature.icon className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{feature.name}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  feature.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {feature.active ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Status */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Regional Status</h4>
          <div className="grid grid-cols-2 gap-2">
            {complianceStatus.map((region) => (
              <div key={region.region} className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-bold text-foreground">{region.region}</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full",
                    region.status === "compliant" 
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  )}>
                    {region.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {region.frameworks.map((fw) => (
                    <span key={fw} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
