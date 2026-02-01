import { Users, Rocket, Building2, Code, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const profiles = [
  {
    profile: "startups",
    icon: Rocket,
    description: "Early-stage companies building AI-first products",
    percentage: 35,
    avgSpend: "$2.4K/mo",
    color: "from-primary to-accent",
  },
  {
    profile: "saas_companies",
    icon: Building2,
    description: "SaaS platforms integrating AI capabilities",
    percentage: 28,
    avgSpend: "$8.2K/mo",
    color: "from-success to-primary",
  },
  {
    profile: "enterprises",
    icon: Briefcase,
    description: "Large organizations with custom requirements",
    percentage: 15,
    avgSpend: "$45K/mo",
    color: "from-warning to-success",
  },
  {
    profile: "developers",
    icon: Code,
    description: "Individual developers and small teams",
    percentage: 12,
    avgSpend: "$890/mo",
    color: "from-accent to-primary",
  },
  {
    profile: "agencies",
    icon: Users,
    description: "Digital agencies building for clients",
    percentage: 10,
    avgSpend: "$5.6K/mo",
    color: "from-primary to-warning",
  },
];

export function BuyerProfiles() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Buyer Profiles</h3>
          <p className="text-xs text-muted-foreground">Segmentos de compradores do marketplace</p>
        </div>
        <Users className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-3">
        {profiles.map((item) => (
          <div
            key={item.profile}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all overflow-hidden"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r", item.color)} />
            
            <div className="relative z-10">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br shrink-0", item.color)}>
                  <item.icon className="w-4 h-4 text-background" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm text-foreground">{item.profile}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{item.avgSpend} avg</span>
                      <span className="text-sm font-bold text-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r transition-all", item.color)}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
