import { Search, FolderTree, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    feature: "semantic_search",
    icon: Search,
    description: "Busca por linguagem natural com embeddings vetoriais",
    usage: "45K queries/day",
    color: "from-primary to-accent",
  },
  {
    feature: "category_browsing",
    icon: FolderTree,
    description: "Navegação hierárquica por categorias e tags",
    usage: "28K sessions/day",
    color: "from-success to-primary",
  },
  {
    feature: "recommended_agents",
    icon: Sparkles,
    description: "Recomendações personalizadas por perfil de uso",
    usage: "12K recommendations/day",
    color: "from-accent to-warning",
  },
  {
    feature: "use_case_matching",
    icon: Target,
    description: "Match automático de produtos por caso de uso",
    usage: "8K matches/day",
    color: "from-warning to-primary",
  },
];

const topSearches = [
  "customer support agent",
  "data extraction api",
  "lead scoring workflow",
  "document parser",
  "sentiment analysis",
];

export function DiscoveryEngine() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Discovery Engine</h3>
          <p className="text-xs text-muted-foreground">Busca e descoberta de produtos</p>
        </div>
        <Search className="w-5 h-5 text-primary" />
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {features.map((item) => (
          <div
            key={item.feature}
            className="group relative p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all overflow-hidden"
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-r", item.color)} />
            
            <div className="relative z-10 flex items-start gap-3">
              <div className={cn("p-2 rounded-lg bg-gradient-to-br shrink-0", item.color)}>
                <item.icon className="w-4 h-4 text-background" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm text-foreground">{item.feature}</span>
                  <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full">{item.usage}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Searches */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Trending Searches</h4>
        <div className="flex flex-wrap gap-2">
          {topSearches.map((search, i) => (
            <span
              key={search}
              className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs text-foreground hover:border-primary/50 cursor-pointer transition-colors flex items-center gap-2"
            >
              <span className="text-muted-foreground">#{i + 1}</span>
              {search}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
