import { Radio, Lock, Shield, Key } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
  { name: "Cross-Org Events", description: "Secure event sharing between organizations", active: true },
  { name: "Secure Event Relay", description: "Encrypted event forwarding", active: true },
  { name: "Policy-Filtered Events", description: "Events filtered by governance policies", active: true },
];

const security = [
  { feature: "Signed Events", icon: Key, status: "enabled" },
  { feature: "Encrypted Streams", icon: Lock, status: "enabled" },
  { feature: "Trust-Scoped Topics", icon: Shield, status: "enabled" },
];

export function FederatedEventBus() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-warning/20">
          <Radio className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Federated Event Bus</h3>
          <p className="text-xs text-muted-foreground">Cross-organization event mesh</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Capabilities */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Capabilities</h4>
          <div className="space-y-2">
            {capabilities.map((cap) => (
              <div key={cap.name} className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{cap.name}</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full",
                    cap.active ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    {cap.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Security</h4>
          <div className="grid grid-cols-3 gap-2">
            {security.map((item) => (
              <div key={item.feature} className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
                <item.icon className="w-4 h-4 text-success mx-auto mb-2" />
                <div className="text-xs font-medium text-foreground">{item.feature}</div>
                <div className="text-[10px] text-success">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
