import { Building, Landmark, Coins, Globe, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  { 
    name: "Enterprise Groups", 
    description: "Multi-subsidiary corporations with shared infrastructure",
    icon: Building,
    example: "Fortune 500 conglomerate"
  },
  { 
    name: "Government Federations", 
    description: "Inter-agency collaboration with strict isolation",
    icon: Landmark,
    example: "Federal agency network"
  },
  { 
    name: "Financial Consortiums", 
    description: "Banks and institutions sharing secure services",
    icon: Coins,
    example: "Banking consortium"
  },
  { 
    name: "Multi-Country SaaS", 
    description: "Global SaaS with regional data sovereignty",
    icon: Globe,
    example: "International platform"
  },
  { 
    name: "Holding Companies", 
    description: "Portfolio companies with unified governance",
    icon: Briefcase,
    example: "PE portfolio"
  },
];

export function FederationUseCases() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-warning/20">
          <Building className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Enterprise Use Cases</h3>
          <p className="text-xs text-muted-foreground">Ideal deployment scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {useCases.map((useCase) => (
          <div key={useCase.name} className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-warning/30 transition-colors">
            <useCase.icon className="w-6 h-6 text-warning mb-3" />
            <h4 className="text-sm font-semibold text-foreground mb-1">{useCase.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{useCase.description}</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
              {useCase.example}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
