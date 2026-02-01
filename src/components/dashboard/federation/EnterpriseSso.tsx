import { Key, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const providers = [
  { name: "SAML", status: "configured", orgs: 12 },
  { name: "OIDC", status: "configured", orgs: 8 },
  { name: "Active Directory", status: "configured", orgs: 15 },
  { name: "Custom IdP", status: "available", orgs: 3 },
];

export function EnterpriseSso() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-warning/20">
          <Key className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Enterprise SSO</h3>
          <p className="text-xs text-muted-foreground">Identity provider federation</p>
        </div>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <div key={provider.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center gap-3">
              {provider.status === "configured" ? (
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-foreground">{provider.name}</div>
                <div className="text-xs text-muted-foreground">{provider.orgs} organizations</div>
              </div>
            </div>
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full",
              provider.status === "configured" 
                ? "bg-success/20 text-success"
                : "bg-muted text-muted-foreground"
            )}>
              {provider.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
