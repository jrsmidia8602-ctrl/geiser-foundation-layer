import { Bot, Activity, Pause, FlaskConical, Zap, Webhook, Clock, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const agentStats = {
  total: 12,
  active: 7,
  inactive: 3,
  experimental: 2,
};

const agentTypes = [
  { type: "api-agent", icon: Zap, count: 4 },
  { type: "llm-agent", icon: Bot, count: 3 },
  { type: "workflow-agent", icon: Activity, count: 3 },
  { type: "monitoring-agent", icon: Clock, count: 2 },
];

const triggerSources = [
  { source: "http_request", active: true },
  { source: "webhook", active: true },
  { source: "cron", active: true },
  { source: "agent_to_agent", active: true },
];

export function RuntimeAgentStats() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Agent Fleet</h3>
            <p className="text-xs text-muted-foreground">Registered agents & execution model</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="text-2xl font-bold text-foreground">{agentStats.total}</div>
          <div className="text-[10px] text-muted-foreground uppercase">Total</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-success/10 border border-success/30">
          <div className="text-2xl font-bold text-success">{agentStats.active}</div>
          <div className="text-[10px] text-success uppercase">Active</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary/50 border border-border">
          <div className="text-2xl font-bold text-muted-foreground">{agentStats.inactive}</div>
          <div className="text-[10px] text-muted-foreground uppercase">Inactive</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/30">
          <div className="text-2xl font-bold text-warning">{agentStats.experimental}</div>
          <div className="text-[10px] text-warning uppercase">Experimental</div>
        </div>
      </div>

      {/* Agent Types */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Agent Types</h4>
        <div className="grid grid-cols-2 gap-2">
          {agentTypes.map((agent) => (
            <div
              key={agent.type}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-border"
            >
              <div className="flex items-center gap-2">
                <agent.icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground font-mono">{agent.type}</span>
              </div>
              <span className="text-sm font-bold text-foreground">{agent.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Sources */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Trigger Sources</h4>
        <div className="flex flex-wrap gap-2">
          {triggerSources.map((trigger) => (
            <span
              key={trigger.source}
              className={cn(
                "text-[10px] px-2 py-1 rounded-full font-mono",
                trigger.active
                  ? "bg-success/10 text-success border border-success/30"
                  : "bg-secondary text-muted-foreground border border-border"
              )}
            >
              {trigger.source}
            </span>
          ))}
        </div>
      </div>

      {/* Execution Model Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Execution: <span className="text-accent font-mono">event-driven</span></span>
          <span>Isolation: <span className="text-primary font-mono">per-tenant-logical</span></span>
        </div>
      </div>
    </div>
  );
}
