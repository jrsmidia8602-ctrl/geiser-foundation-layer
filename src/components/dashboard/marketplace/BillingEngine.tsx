import { CreditCard, Wallet, FileText, Coins, Play, Bot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { method: "stripe", icon: CreditCard, status: "active", volume: "$1.8M" },
  { method: "crypto", icon: Wallet, status: "active", volume: "$420K" },
  { method: "enterprise_invoice", icon: FileText, status: "active", volume: "$180K" },
];

const billingUnits = [
  { unit: "tokens", icon: Coins, consumed: "2.4B", trend: "+12%" },
  { unit: "executions", icon: Play, consumed: "847K", trend: "+8%" },
  { unit: "agents_active", icon: Bot, consumed: "1.2K", trend: "+15%" },
  { unit: "api_calls", icon: Zap, consumed: "12.3M", trend: "+22%" },
];

export function BillingEngine() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Billing Engine</h3>
          <p className="text-xs text-muted-foreground">Métodos de pagamento e unidades de cobrança</p>
        </div>
        <CreditCard className="w-5 h-5 text-primary" />
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Payment Methods</h4>
        <div className="space-y-2">
          {paymentMethods.map((item) => (
            <div
              key={item.method}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground">{item.method}</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <span className="text-[10px] text-success">{item.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{item.volume}</div>
                <div className="text-[10px] text-muted-foreground">processed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Units */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Billing Units</h4>
        <div className="grid grid-cols-2 gap-3">
          {billingUnits.map((item) => (
            <div
              key={item.unit}
              className="p-3 rounded-lg bg-secondary/50 border border-border text-center"
            >
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{item.consumed}</div>
              <div className="font-mono text-[10px] text-muted-foreground uppercase mb-1">{item.unit}</div>
              <span className="text-[10px] text-success">{item.trend}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
