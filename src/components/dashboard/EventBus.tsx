import { Zap, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const recentEvents = [
  { type: "entity.created", source: "api_gateway", time: "2s ago", processed: true },
  { type: "agent.executed", source: "agent_01", time: "15s ago", processed: true },
  { type: "workflow.started", source: "workflow_main", time: "1m ago", processed: true },
  { type: "decision.made", source: "decision_engine", time: "2m ago", processed: true },
  { type: "error.detected", source: "monitor_01", time: "5m ago", processed: false },
];

const eventTypes = [
  "entity.created",
  "agent.executed", 
  "workflow.started",
  "decision.made",
  "error.detected",
];

export function EventBus() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Event Bus</h3>
            <p className="text-xs text-muted-foreground font-mono">events</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs text-success">Live</span>
        </div>
      </div>

      {/* Event types */}
      <div className="flex flex-wrap gap-2 mb-6">
        {eventTypes.map((type) => (
          <span
            key={type}
            className="px-2 py-1 text-xs font-mono rounded bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Recent events stream */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground mb-3">Recent Events</div>
        {recentEvents.map((event, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg transition-all",
              "bg-secondary/30 hover:bg-secondary/50 cursor-pointer",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              {event.processed ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <XCircle className="w-4 h-4 text-destructive" />
              )}
              <span className="font-mono text-sm text-foreground">{event.type}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{event.source}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {event.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
