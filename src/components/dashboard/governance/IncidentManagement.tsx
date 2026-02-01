import { AlertOctagon, Search, ShieldOff, Pause, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { feature: "automatic_incident_detection", icon: Search, status: "active", incidents: 47 },
  { feature: "agent_quarantine", icon: ShieldOff, status: "active", incidents: 12 },
  { feature: "execution_freeze", icon: Pause, status: "armed", incidents: 3 },
  { feature: "incident_reports", icon: FileText, status: "active", incidents: 156 },
];

const recentIncidents = [
  { id: "INC-001", type: "cost_spike", severity: "medium", status: "resolved", time: "2h ago" },
  { id: "INC-002", type: "rate_limit_breach", severity: "low", status: "resolved", time: "5h ago" },
  { id: "INC-003", type: "agent_timeout", severity: "high", status: "investigating", time: "1d ago" },
];

export function IncidentManagement() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Incident Management</h3>
          <p className="text-xs text-muted-foreground">Gestão de incidentes e anomalias</p>
        </div>
        <AlertOctagon className="w-5 h-5 text-destructive" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map((item) => (
          <div
            key={item.feature}
            className="p-3 rounded-xl border border-border/50 bg-secondary/30 hover:border-destructive/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-destructive/10">
                <item.icon className="w-3.5 h-3.5 text-destructive" />
              </div>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                item.status === "active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
              )}>
                {item.status}
              </span>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase mb-1">{item.feature}</div>
            <div className="text-lg font-bold text-foreground">{item.incidents}</div>
          </div>
        ))}
      </div>

      {/* Recent Incidents */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Recent Incidents</h4>
        <div className="space-y-2">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border hover:border-destructive/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  incident.severity === "high" ? "bg-destructive" :
                  incident.severity === "medium" ? "bg-warning" : "bg-success"
                )} />
                <div>
                  <div className="font-mono text-sm text-foreground">{incident.id}</div>
                  <div className="text-xs text-muted-foreground">{incident.type}</div>
                </div>
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  incident.status === "resolved" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                )}>
                  {incident.status}
                </span>
                <div className="text-[10px] text-muted-foreground mt-1">{incident.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
