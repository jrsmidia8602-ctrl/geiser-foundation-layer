import { CreditCard, CheckCircle, AlertTriangle, RefreshCw, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const providers = [
  { name: "Stripe", status: "connected", icon: "💳" },
  { name: "PayPal", status: "ready", icon: "🅿️" },
  { name: "Crypto (USDC)", status: "ready", icon: "🔗" },
  { name: "Manual Invoice", status: "connected", icon: "📄" },
];

const features = [
  { feature: "auto_charge", label: "Auto Charge", enabled: true },
  { feature: "failed_payment_retry", label: "Failed Payment Retry", enabled: true },
  { feature: "invoice_generation", label: "Invoice Generation", enabled: true },
];

const recentPayments = [
  { tenant: "Acme Corp", amount: 99.00, status: "success", method: "Stripe", date: "2h ago" },
  { tenant: "TechStart", amount: 29.00, status: "success", method: "Stripe", date: "5h ago" },
  { tenant: "DataFlow", amount: 149.00, status: "pending", method: "Invoice", date: "1d ago" },
  { tenant: "AIBuilder", amount: 99.00, status: "failed", method: "Stripe", date: "2d ago" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/20" },
  pending: { icon: RefreshCw, color: "text-warning", bg: "bg-warning/20" },
  failed: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/20" },
};

export function PaymentsPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <CreditCard className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Payments</h3>
            <p className="text-xs text-muted-foreground">Payment providers & processing</p>
          </div>
        </div>
      </div>

      {/* Providers */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Payment Providers</h4>
        <div className="grid grid-cols-2 gap-2">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="flex items-center justify-between p-2 rounded-lg border border-border hover:bg-secondary/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <span>{provider.icon}</span>
                <span className="text-xs text-foreground">{provider.name}</span>
              </div>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                provider.status === "connected"
                  ? "bg-success/20 text-success"
                  : "bg-secondary text-muted-foreground"
              )}>
                {provider.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Features</h4>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature.feature}
              className={cn(
                "text-[10px] px-2 py-1 rounded-full border",
                feature.enabled
                  ? "bg-success/10 text-success border-success/30"
                  : "bg-secondary text-muted-foreground border-border"
              )}
            >
              {feature.label}: {feature.enabled ? "✓" : "✗"}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Payments */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Payments</h4>
        <div className="space-y-2">
          {recentPayments.map((payment, i) => {
            const cfg = statusConfig[payment.status];
            const StatusIcon = cfg.icon;
            return (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <span className={cn("p-1 rounded", cfg.bg)}>
                    <StatusIcon className={cn("w-3 h-3", cfg.color)} />
                  </span>
                  <div>
                    <span className="text-xs text-foreground">{payment.tenant}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">{payment.method}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-foreground">${payment.amount.toFixed(2)}</span>
                  <span className="text-[10px] text-muted-foreground block">{payment.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
