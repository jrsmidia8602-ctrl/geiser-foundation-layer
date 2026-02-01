import { Shield, TrendingUp, XCircle, DollarSign, Brain, MessageSquare, Bot, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const signals = [
  { signal: "success_rate", icon: TrendingUp, value: 94.2, unit: "%", trend: "+2.1%", color: "text-success" },
  { signal: "error_rate", icon: XCircle, value: 0.8, unit: "%", trend: "-0.3%", color: "text-destructive" },
  { signal: "cost_efficiency", icon: DollarSign, value: 87, unit: "%", trend: "+5%", color: "text-warning" },
  { signal: "decision_consistency", icon: Brain, value: 91.5, unit: "%", trend: "+1.2%", color: "text-accent" },
  { signal: "user_feedback", icon: MessageSquare, value: 4.7, unit: "/5", trend: "+0.2", color: "text-primary" },
];

const trustScores = [
  { type: "agent_trust_score", icon: Bot, score: 89, color: "from-primary to-accent" },
  { type: "infra_trust_score", icon: Server, score: 96, color: "from-success to-primary" },
];

export function TrustSignals() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Trust Signals</h3>
          <p className="text-xs text-muted-foreground">Sinais de confiança e qualidade</p>
        </div>
        <Shield className="w-5 h-5 text-primary" />
      </div>

      {/* Trust Scores */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {trustScores.map((item) => (
          <div
            key={item.type}
            className="relative p-4 rounded-xl overflow-hidden"
          >
            <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", item.color)} />
            <div className="relative z-10 text-center">
              <item.icon className="w-8 h-8 mx-auto mb-2 text-foreground" />
              <div className="text-3xl font-bold text-foreground mb-1">{item.score}%</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase">{item.type}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal Metrics */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Signal Metrics</h4>
        <div className="space-y-3">
          {signals.map((item) => (
            <div
              key={item.signal}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <item.icon className={cn("w-4 h-4 shrink-0", item.color)} />
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-foreground">{item.signal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">
                  {item.value}{item.unit}
                </span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  item.trend.startsWith("+") ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                )}>
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
