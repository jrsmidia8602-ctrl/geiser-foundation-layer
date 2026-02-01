import { Globe, Zap, Calendar, Webhook } from "lucide-react";
import { cn } from "@/lib/utils";

const triggers = [
  {
    type: "http_request",
    name: "HTTP Request",
    description: "Dispara via chamada REST API",
    icon: Globe,
    color: "from-primary to-primary/50",
    active: 12,
    example: "POST /api/workflows/{id}/trigger",
  },
  {
    type: "agent_event",
    name: "Agent Event",
    description: "Dispara quando um agente emite evento",
    icon: Zap,
    color: "from-accent to-accent/50",
    active: 8,
    example: "on: agent.executed → start workflow",
  },
  {
    type: "cron_schedule",
    name: "Cron Schedule",
    description: "Execução programada por horário",
    icon: Calendar,
    color: "from-success to-success/50",
    active: 15,
    example: "0 9 * * 1-5 (weekdays at 9am)",
  },
  {
    type: "external_webhook",
    name: "External Webhook",
    description: "Recebe webhook de serviço externo",
    icon: Webhook,
    color: "from-warning to-warning/50",
    active: 6,
    example: "Stripe, GitHub, Slack webhooks",
  },
];

const recentTriggers = [
  { workflow: "User Onboarding", trigger: "http_request", time: "2m ago" },
  { workflow: "Order Pipeline", trigger: "agent_event", time: "5m ago" },
  { workflow: "Daily Report", trigger: "cron_schedule", time: "1h ago" },
  { workflow: "Payment Webhook", trigger: "external_webhook", time: "3h ago" },
];

export function Triggers() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/20">
            <Zap className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Triggers</h3>
            <p className="text-xs text-muted-foreground">Workflow activation sources</p>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{triggers.length} types</span>
      </div>

      {/* Trigger Types */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {triggers.map((trigger) => (
          <div
            key={trigger.type}
            className="group p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", trigger.color)}>
                <trigger.icon className="w-3 h-3 text-background" />
              </div>
              <span className="font-medium text-foreground text-sm">{trigger.name}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">{trigger.description}</p>
            <div className="flex items-center justify-between">
              <code className="text-[9px] text-muted-foreground font-mono truncate max-w-[120px]">
                {trigger.example}
              </code>
              <span className="text-[10px] font-mono text-success">{trigger.active} active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Triggers */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Triggers</h4>
        <div className="space-y-2">
          {recentTriggers.map((item, i) => {
            const trigger = triggers.find(t => t.type === item.trigger);
            const TriggerIcon = trigger?.icon || Zap;
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <TriggerIcon className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-foreground">{item.workflow}</span>
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
