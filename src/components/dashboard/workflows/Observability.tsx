import { Activity, Clock, AlertTriangle, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  { time: "14:32:01", event: "workflow.started", workflow: "Order Pipeline", latency: null },
  { time: "14:32:02", event: "workflow.step.completed", workflow: "Order Pipeline", node: "validate_order", latency: 45 },
  { time: "14:32:03", event: "workflow.step.completed", workflow: "Order Pipeline", node: "check_inventory", latency: 120 },
  { time: "14:32:04", event: "workflow.step.completed", workflow: "Order Pipeline", node: "process_payment", latency: 890 },
  { time: "14:32:05", event: "workflow.completed", workflow: "Order Pipeline", latency: 1055 },
];

const nodeLatencies = [
  { node: "validate_order", avg: 45, p95: 78, p99: 120 },
  { node: "check_inventory", avg: 120, p95: 250, p99: 400 },
  { node: "process_payment", avg: 890, p95: 1200, p99: 1800 },
  { node: "send_confirmation", avg: 230, p95: 380, p99: 500 },
];

const recentErrors = [
  { workflow: "Payment Recon", node: "fetch_transactions", error: "TIMEOUT", time: "1h ago" },
  { workflow: "AI Content", node: "generate_image", error: "API_ERROR", time: "3h ago" },
];

export function Observability() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Observability</h3>
            <p className="text-xs text-muted-foreground">Execution monitoring & tracing</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Execution Timeline</h4>
        <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
          {timelineEvents.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20 border border-border hover:bg-secondary/30 transition-all"
            >
              <span className="text-[10px] font-mono text-muted-foreground w-16">{event.time}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded font-mono",
                event.event === "workflow.started" && "bg-primary/20 text-primary",
                event.event === "workflow.step.completed" && "bg-success/20 text-success",
                event.event === "workflow.completed" && "bg-accent/20 text-accent",
                event.event === "workflow.failed" && "bg-destructive/20 text-destructive"
              )}>
                {event.event}
              </span>
              {event.node && (
                <span className="text-[10px] text-muted-foreground">{event.node}</span>
              )}
              {event.latency && (
                <span className="text-[10px] font-mono text-muted-foreground ml-auto">{event.latency}ms</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Node Latency Tracking */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <h4 className="text-xs font-medium text-muted-foreground">Node Latency (ms)</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {nodeLatencies.map((node) => (
            <div key={node.node} className="p-2 rounded-lg bg-secondary/20 border border-border">
              <span className="text-[10px] text-foreground font-medium block mb-1">{node.node}</span>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>avg: {node.avg}</span>
                <span>p95: {node.p95}</span>
                <span>p99: {node.p99}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Trace */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-3 h-3 text-warning" />
          <h4 className="text-xs font-medium text-muted-foreground">Recent Errors</h4>
        </div>
        {recentErrors.length > 0 ? (
          <div className="space-y-2">
            {recentErrors.map((error, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-destructive/10 border border-destructive/20"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-destructive" />
                  <div>
                    <span className="text-xs text-foreground">{error.workflow}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">@ {error.node}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-destructive block">{error.error}</span>
                  <span className="text-[10px] text-muted-foreground">{error.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
            <span className="text-xs text-success">No recent errors</span>
          </div>
        )}
      </div>
    </div>
  );
}
