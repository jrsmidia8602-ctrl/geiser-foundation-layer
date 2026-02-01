import { Users, FileCheck, Key, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { 
    name: "Agent-to-Agent Contracts", 
    description: "Formal agreements between autonomous agents",
    icon: FileCheck,
    status: "active"
  },
  { 
    name: "API Trust Agreements", 
    description: "Verified API access between organizations",
    icon: Key,
    status: "active"
  },
  { 
    name: "Temporary Access Tokens", 
    description: "Time-limited cross-org permissions",
    icon: Users,
    status: "active"
  },
  { 
    name: "Revenue Sharing Rules", 
    description: "Automated profit distribution",
    icon: DollarSign,
    status: "active"
  },
];

const activeContracts = [
  { org: "Acme Corp", type: "agent_contract", expires: "30 days" },
  { org: "TechStart", type: "api_trust", expires: "90 days" },
  { org: "Enterprise Ltd", type: "revenue_share", expires: "1 year" },
];

export function CrossOrgCollaboration() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <Users className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Cross-Org Collaboration</h3>
          <p className="text-xs text-muted-foreground">Secure inter-organization cooperation</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Features */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Collaboration Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => (
              <div key={feature.name} className="p-3 rounded-lg bg-secondary/50 border border-border">
                <feature.icon className="w-4 h-4 text-accent mb-2" />
                <div className="text-sm font-medium text-foreground mb-1">{feature.name}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Contracts */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Active Contracts</h4>
          <div className="space-y-2">
            {activeContracts.map((contract, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">{contract.org}</div>
                  <div className="text-xs font-mono text-muted-foreground">{contract.type}</div>
                </div>
                <span className="text-xs text-accent">Expires: {contract.expires}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
