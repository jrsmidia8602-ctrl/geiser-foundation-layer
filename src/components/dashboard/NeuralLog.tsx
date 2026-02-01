import { ScrollText, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { message: "Entity agent_01 registered successfully", status: "success", latency: 12, time: "10:45:32" },
  { message: "Workflow workflow_main started", status: "success", latency: 8, time: "10:45:30" },
  { message: "Decision engine processed event_4521", status: "success", latency: 45, time: "10:45:28" },
  { message: "API rate limit warning for endpoint /v1/agents", status: "warning", latency: 120, time: "10:45:25" },
  { message: "Connection timeout to external service", status: "error", latency: 5000, time: "10:45:20" },
  { message: "Event entity.created dispatched", status: "success", latency: 5, time: "10:45:18" },
];

const statusIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
};

const statusColors = {
  success: "text-success",
  error: "text-destructive",
  warning: "text-warning",
};

export function NeuralLog() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <ScrollText className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Neural Log</h3>
            <p className="text-xs text-muted-foreground font-mono">logs</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">1,247 entries today</span>
      </div>

      {/* Log entries */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {logs.map((log, i) => {
          const Icon = statusIcons[log.status as keyof typeof statusIcons];
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", statusColors[log.status as keyof typeof statusColors])} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{log.message}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="font-mono">{log.time}</span>
                  <span className={cn(
                    "font-mono",
                    log.latency > 1000 ? "text-destructive" : log.latency > 100 ? "text-warning" : "text-success"
                  )}>
                    {log.latency}ms
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schema preview */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-foreground">Purpose:</span> System memory for audit & AI training
        </div>
      </div>
    </div>
  );
}
