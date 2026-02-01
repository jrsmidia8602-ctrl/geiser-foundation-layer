import { FileCode, Play, DollarSign, Database, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const policyTypes = [
  { type: "execution_policy", icon: Play, count: 23, description: "Políticas de execução de agentes" },
  { type: "cost_policy", icon: DollarSign, count: 15, description: "Políticas de controle de custos" },
  { type: "data_policy", icon: Database, count: 18, description: "Políticas de tratamento de dados" },
  { type: "security_policy", icon: Lock, count: 12, description: "Políticas de segurança" },
];

const evaluationTimes = [
  { time: "pre_execution", active: 47, color: "bg-primary" },
  { time: "mid_execution", active: 23, color: "bg-warning" },
  { time: "post_execution", active: 31, color: "bg-success" },
];

const recentPolicies = [
  { name: "max_tokens_per_call", type: "cost", status: "active", lastUpdated: "2h ago" },
  { name: "pii_anonymization", type: "data", status: "active", lastUpdated: "1d ago" },
  { name: "agent_rate_limit", type: "execution", status: "active", lastUpdated: "3d ago" },
  { name: "mfa_required", type: "security", status: "active", lastUpdated: "5d ago" },
];

export function PolicyEngine() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Policy Engine</h3>
          <p className="text-xs text-muted-foreground">Motor de políticas e regras</p>
        </div>
        <FileCode className="w-5 h-5 text-primary" />
      </div>

      {/* Policy Types */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {policyTypes.map((item) => (
          <div
            key={item.type}
            className="p-3 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <item.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">{item.count}</span>
            </div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase mb-0.5">{item.type}</div>
            <p className="text-[10px] text-muted-foreground truncate">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Evaluation Times */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Evaluation Times</h4>
        <div className="flex gap-4">
          {evaluationTimes.map((item) => (
            <div key={item.time} className="flex-1 p-3 rounded-lg bg-secondary/50 border border-border text-center">
              <Clock className={cn("w-4 h-4 mx-auto mb-1", item.color.replace("bg-", "text-"))} />
              <div className="text-lg font-bold text-foreground">{item.active}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Policies */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Recent Policies</h4>
        <div className="space-y-2">
          {recentPolicies.map((policy) => (
            <div
              key={policy.name}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="font-mono text-xs text-foreground">{policy.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-secondary">{policy.type}</span>
                <span>{policy.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
