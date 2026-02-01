import { AlertTriangle, DollarSign, Cog, Lock, FileCheck, MessageSquare, Eye, ClipboardCheck, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const riskTypes = [
  { type: "financial", icon: DollarSign, score: 23, color: "text-warning" },
  { type: "operational", icon: Cog, score: 15, color: "text-primary" },
  { type: "security", icon: Lock, score: 8, color: "text-destructive" },
  { type: "compliance", icon: FileCheck, score: 5, color: "text-success" },
  { type: "reputation", icon: MessageSquare, score: 12, color: "text-accent" },
];

const controls = [
  { control: "pre_execution_risk_check", description: "Verificação de risco antes da execução", active: true },
  { control: "real_time_monitoring", description: "Monitoramento em tempo real", active: true },
  { control: "post_execution_review", description: "Revisão pós-execução automática", active: true },
  { control: "risk_score_thresholds", description: "Thresholds de score de risco", active: true },
];

export function RiskManagement() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Risk Management</h3>
          <p className="text-xs text-muted-foreground">Gestão e controle de riscos</p>
        </div>
        <AlertTriangle className="w-5 h-5 text-warning" />
      </div>

      {/* Risk Types */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Risk Types & Scores</h4>
        <div className="space-y-3">
          {riskTypes.map((item) => (
            <div key={item.type} className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4 shrink-0", item.color)} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-foreground">{item.type}</span>
                  <span className={cn("text-xs font-bold", item.color)}>{item.score}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", item.color.replace("text-", "bg-"))}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 text-center">
        <Gauge className="w-8 h-8 text-success mx-auto mb-2" />
        <div className="text-3xl font-bold text-success">LOW</div>
        <div className="text-xs text-muted-foreground">Overall Risk Level</div>
      </div>

      {/* Controls */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Risk Controls</h4>
        <div className="space-y-2">
          {controls.map((item) => (
            <div
              key={item.control}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  item.active ? "bg-success" : "bg-muted"
                )} />
                <span className="font-mono text-xs text-foreground">{item.control}</span>
              </div>
              <span className="text-[10px] text-success">{item.active ? "active" : "inactive"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
