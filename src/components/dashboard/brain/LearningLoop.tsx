import { RefreshCw, TrendingUp, MessageSquare, DollarSign, Activity, Target } from "lucide-react";

const feedbackSources = [
  { name: "execution_result", icon: Activity, color: "text-success" },
  { name: "human_feedback", icon: MessageSquare, color: "text-primary" },
  { name: "cost_delta", icon: DollarSign, color: "text-warning" },
  { name: "performance_metrics", icon: TrendingUp, color: "text-accent" },
];

const learningModes = [
  { mode: "reinforcement", description: "Reward-based optimization", progress: 78 },
  { mode: "pattern_weighting", description: "Pattern importance scoring", progress: 85 },
  { mode: "outcome_scoring", description: "Results-driven learning", progress: 92 },
];

export function LearningLoop() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <RefreshCw className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Learning Loop</h3>
            <p className="text-xs text-muted-foreground">Continuous improvement cycle</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          enabled
        </span>
      </div>

      {/* Feedback Sources */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Feedback Sources</div>
        <div className="grid grid-cols-2 gap-2">
          {feedbackSources.map((source) => (
            <div
              key={source.name}
              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-secondary/30"
            >
              <source.icon className={`w-4 h-4 ${source.color}`} />
              <span className="font-mono text-xs text-foreground">{source.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Modes */}
      <div className="space-y-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Learning Modes</div>
        {learningModes.map((mode) => (
          <div key={mode.mode} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-sm text-foreground">{mode.mode}</div>
                <div className="text-[10px] text-muted-foreground">{mode.description}</div>
              </div>
              <span className="font-mono text-xs text-primary">{mode.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-success to-primary"
                style={{ width: `${mode.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Learning Stats */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">+12.4%</div>
          <div className="text-xs text-muted-foreground">Learning Gain</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">1,247</div>
          <div className="text-xs text-muted-foreground">Patterns Learned</div>
        </div>
      </div>
    </div>
  );
}
