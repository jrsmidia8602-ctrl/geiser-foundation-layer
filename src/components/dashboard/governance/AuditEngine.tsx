import { FileSearch, Server, Users, Bot, Play, Database, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const auditLevels = [
  { level: "system", icon: Server, events: "45K", color: "bg-primary" },
  { level: "tenant", icon: Users, events: "234K", color: "bg-success" },
  { level: "agent", icon: Bot, events: "567K", color: "bg-accent" },
  { level: "execution", icon: Play, events: "1.2M", color: "bg-warning" },
];

const artifacts = [
  "inputs", "outputs", "decision_graph", "latency", "cost", "model_used"
];

const retentionPolicies = [
  { policy: "30_days", tenants: 45, storage: "12GB" },
  { policy: "90_days", tenants: 67, storage: "34GB" },
  { policy: "1_year", tenants: 23, storage: "89GB" },
  { policy: "custom_enterprise", tenants: 7, storage: "156GB" },
];

export function AuditEngine() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Audit Engine</h3>
          <p className="text-xs text-muted-foreground">Motor de auditoria e rastreabilidade</p>
        </div>
        <FileSearch className="w-5 h-5 text-primary" />
      </div>

      {/* Audit Levels */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Audit Levels</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {auditLevels.map((item) => (
            <div key={item.level} className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <item.icon className={cn("w-5 h-5 mx-auto mb-2", item.color.replace("bg-", "text-"))} />
              <div className="text-lg font-bold text-foreground">{item.events}</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase">{item.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stored Artifacts */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Stored Artifacts</h4>
        <div className="flex flex-wrap gap-2">
          {artifacts.map((artifact) => (
            <span
              key={artifact}
              className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20"
            >
              {artifact}
            </span>
          ))}
        </div>
      </div>

      {/* Retention Policies */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Retention Policies</h4>
        <div className="space-y-2">
          {retentionPolicies.map((item) => (
            <div
              key={item.policy}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-sm text-foreground">{item.policy}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{item.tenants} tenants</span>
                <span className="font-mono text-foreground">{item.storage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
