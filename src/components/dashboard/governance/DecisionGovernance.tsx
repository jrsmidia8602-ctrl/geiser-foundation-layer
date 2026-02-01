import { Brain, FileText, Target, RotateCcw, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    feature: "decision_logging",
    icon: FileText,
    description: "Log completo de todas as decisões tomadas",
    enabled: true,
    metric: "1.2M logs",
  },
  {
    feature: "confidence_scoring",
    icon: Target,
    description: "Score de confiança para cada decisão",
    enabled: true,
    metric: "avg 87%",
  },
  {
    feature: "explainability_metadata",
    icon: Brain,
    description: "Metadados de explicabilidade por decisão",
    enabled: true,
    metric: "100% covered",
  },
  {
    feature: "decision_replay",
    icon: RotateCcw,
    description: "Replay de decisões para auditoria",
    enabled: true,
    metric: "12K replays",
  },
  {
    feature: "human_override",
    icon: Hand,
    description: "Override manual de decisões críticas",
    enabled: true,
    metric: "89 overrides",
  },
];

export function DecisionGovernance() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Decision Governance</h3>
          <p className="text-xs text-muted-foreground">Governança de decisões autônomas</p>
        </div>
        <Brain className="w-5 h-5 text-accent" />
      </div>

      <div className="space-y-3">
        {features.map((item) => (
          <div
            key={item.feature}
            className="group p-3 rounded-xl border border-border/50 bg-secondary/30 hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                <item.icon className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-sm text-foreground">{item.feature}</span>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {item.metric}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
