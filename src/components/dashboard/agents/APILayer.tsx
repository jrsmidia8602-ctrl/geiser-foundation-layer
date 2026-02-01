import { Globe, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const requestFlow = [
  { step: "receive_request", label: "Receive", status: "complete" },
  { step: "validate_schema", label: "Validate", status: "complete" },
  { step: "load_agent_context", label: "Load Context", status: "complete" },
  { step: "execute_agent", label: "Execute", status: "active" },
  { step: "emit_event", label: "Emit Event", status: "pending" },
  { step: "return_response", label: "Response", status: "pending" },
];

const recentCalls = [
  { endpoint: "/api/v1/agents/agent_001/execute", status: "success", latency: 45, time: "10:45:32" },
  { endpoint: "/api/v1/agents/agent_002/execute", status: "success", latency: 120, time: "10:45:28" },
  { endpoint: "/api/v1/agents/agent_003/execute", status: "error", latency: 5000, time: "10:45:20" },
  { endpoint: "/api/v1/agents/agent_004/execute", status: "success", latency: 890, time: "10:45:15" },
];

export function APILayer() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Globe className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">API Layer</h3>
            <p className="text-xs text-muted-foreground font-mono">/api/v1/agents/&#123;id&#125;/execute</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">4.2k calls/hour</span>
      </div>

      {/* Request Flow Pipeline */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Request Flow</h4>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {requestFlow.map((item, i) => (
            <div key={item.step} className="flex items-center">
              <div
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all",
                  item.status === "complete" && "bg-success/20 text-success",
                  item.status === "active" && "bg-primary/20 text-primary animate-pulse",
                  item.status === "pending" && "bg-muted text-muted-foreground"
                )}
              >
                {item.label}
              </div>
              {i < requestFlow.length - 1 && (
                <ArrowRight className={cn(
                  "w-4 h-4 mx-1 flex-shrink-0",
                  item.status === "complete" ? "text-success" : "text-muted-foreground"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent API Calls */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Recent Calls</h4>
        <div className="space-y-2">
          {recentCalls.map((call, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {call.status === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
                <span className="text-xs font-mono text-foreground truncate max-w-[200px]">{call.endpoint}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-muted-foreground font-mono">{call.time}</span>
                <span className={cn(
                  "font-mono",
                  call.latency > 1000 ? "text-destructive" : call.latency > 100 ? "text-warning" : "text-success"
                )}>
                  {call.latency}ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Contract */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-foreground">Response:</span> &#123; status, data, latency_ms, trace_id &#125;
        </div>
      </div>
    </div>
  );
}
