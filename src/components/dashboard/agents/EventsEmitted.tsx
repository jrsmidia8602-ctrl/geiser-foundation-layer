import { Radio, Plus, RefreshCw, Play, XCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const events = [
  { type: "agent.created", icon: Plus, count: 12, color: "text-success", bgColor: "bg-success/10" },
  { type: "agent.updated", icon: RefreshCw, count: 45, color: "text-primary", bgColor: "bg-primary/10" },
  { type: "agent.executed", icon: Play, count: 1247, color: "text-accent", bgColor: "bg-accent/10" },
  { type: "agent.failed", icon: XCircle, count: 23, color: "text-destructive", bgColor: "bg-destructive/10" },
  { type: "api.called", icon: Phone, count: 4521, color: "text-warning", bgColor: "bg-warning/10" },
];

export function EventsEmitted() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Radio className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Events Emitted</h3>
            <p className="text-xs text-muted-foreground font-mono">event_bus</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">5 event types</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div
              key={event.type}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", event.bgColor)}>
                  <Icon className={cn("w-4 h-4", event.color)} />
                </div>
                <span className="font-mono text-sm text-foreground">{event.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">{event.count.toLocaleString()}</span>
                <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", event.bgColor.replace("/10", ""))}
                    style={{ width: `${Math.min((event.count / 5000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-foreground">Integration:</span> GEISER_01_CORE.event_bus
        </div>
      </div>
    </div>
  );
}
