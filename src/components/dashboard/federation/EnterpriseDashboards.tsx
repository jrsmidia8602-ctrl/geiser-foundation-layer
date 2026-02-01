import { LayoutDashboard, Globe, Heart, DollarSign, Users, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const views = [
  { name: "Global Federation Map", icon: Globe, description: "Visual org topology" },
  { name: "Org Health Status", icon: Heart, description: "Real-time health metrics" },
  { name: "Cross-Region Costs", icon: DollarSign, description: "Distributed cost analysis" },
  { name: "Trust Relationships", icon: Users, description: "Inter-org trust graph" },
  { name: "Policy Violations", icon: AlertTriangle, description: "Compliance alerts" },
];

export function EnterpriseDashboards() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <LayoutDashboard className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Enterprise Dashboards</h3>
          <p className="text-xs text-muted-foreground">Unified visibility across federation</p>
        </div>
      </div>

      <div className="space-y-3">
        {views.map((view) => (
          <div
            key={view.name}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border hover:border-accent/50 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-accent/10">
              <view.icon className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{view.name}</div>
              <div className="text-xs text-muted-foreground">{view.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
