import { Radio, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  {
    name: "workflow.started",
    description: "Emitido quando um workflow inicia execução",
    frequency: "42/h",
    color: "text-primary",
  },
  {
    name: "workflow.step.completed",
    description: "Emitido após cada step completar com sucesso",
    frequency: "186/h",
    color: "text-success",
  },
  {
    name: "workflow.failed",
    description: "Emitido quando um workflow falha",
    frequency: "3/h",
    color: "text-destructive",
  },
  {
    name: "workflow.completed",
    description: "Emitido quando workflow finaliza com sucesso",
    frequency: "39/h",
    color: "text-accent",
  },
];

const recentEvents = [
  { event: "workflow.completed", workflow: "User Onboarding", time: "2m ago" },
  { event: "workflow.step.completed", workflow: "Order Pipeline", node: "validate", time: "3m ago" },
  { event: "workflow.started", workflow: "AI Content", time: "5m ago" },
  { event: "workflow.failed", workflow: "Payment Recon", error: "TIMEOUT", time: "1h ago" },
];

export function WorkflowEvents() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/20">
            <Radio className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Events Emitted</h3>
            <p className="text-xs text-muted-foreground">Integrates with GEISER_01 Event Bus</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Broadcasting</span>
        </div>
      </div>

      {/* Event Types */}
      <div className="space-y-3 mb-6">
        {events.map((event) => (
          <div
            key={event.name}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Zap className={cn("w-4 h-4", event.color)} />
              <div>
                <code className="text-xs font-mono text-foreground">{event.name}</code>
                <p className="text-[10px] text-muted-foreground">{event.description}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{event.frequency}</span>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Events</h4>
        <div className="space-y-2">
          {recentEvents.map((item, i) => {
            const eventConfig = events.find(e => e.name === item.event);
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <Zap className={cn("w-3 h-3", eventConfig?.color || "text-muted-foreground")} />
                  <span className="text-xs text-foreground">{item.workflow}</span>
                  {item.node && (
                    <span className="text-[10px] text-muted-foreground">@ {item.node}</span>
                  )}
                  {item.error && (
                    <span className="text-[10px] text-destructive">{item.error}</span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
