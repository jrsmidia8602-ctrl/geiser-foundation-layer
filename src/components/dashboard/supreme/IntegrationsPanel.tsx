import { Plug, CreditCard, Mail, Database, Brain, Check, Zap } from "lucide-react";

export function IntegrationsPanel() {
  const integrationGroups = [
    {
      category: "Payments",
      icon: CreditCard,
      color: "text-success",
      items: [
        { name: "Stripe", status: "connected" },
        { name: "PayPal", status: "connected" },
        { name: "MercadoPago", status: "ready" },
        { name: "Crypto", status: "ready" },
      ]
    },
    {
      category: "Marketing",
      icon: Mail,
      color: "text-primary",
      items: [
        { name: "Email Marketing", status: "connected" },
        { name: "WhatsApp API", status: "connected" },
        { name: "SMS", status: "ready" },
        { name: "Push Notifications", status: "connected" },
      ]
    },
    {
      category: "Data",
      icon: Database,
      color: "text-accent",
      items: [
        { name: "Xano", status: "ready" },
        { name: "Supabase", status: "connected" },
        { name: "PostgreSQL", status: "connected" },
      ]
    },
    {
      category: "AI",
      icon: Brain,
      color: "text-warning",
      items: [
        { name: "OpenRouter", status: "connected" },
        { name: "LLM Multi-Provider", status: "connected" },
        { name: "Giovana AI Core", status: "connected" },
      ]
    },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10 border border-success/20">
            <Plug className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Integrations</h3>
            <p className="text-xs text-muted-foreground">Connected services</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 text-success text-xs">
          <Zap className="w-3 h-3" />
          14 active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {integrationGroups.map((group) => (
          <div key={group.category} className="p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <group.icon className={`w-4 h-4 ${group.color}`} />
              <span className="text-sm font-medium text-foreground">{group.category}</span>
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className={`flex items-center gap-1 ${
                    item.status === 'connected' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {item.status === 'connected' && <Check className="w-3 h-3" />}
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
