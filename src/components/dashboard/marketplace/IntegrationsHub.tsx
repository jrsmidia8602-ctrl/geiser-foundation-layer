import { Plug, Globe, Server, Database, Brain, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const integrationCategories = [
  {
    category: "frontend",
    icon: Globe,
    color: "from-primary to-primary/50",
    items: [
      { name: "Lovable.dev", status: "connected" },
      { name: "Next.js", status: "available" },
      { name: "White-label Dashboards", status: "connected" },
    ],
  },
  {
    category: "backend",
    icon: Server,
    color: "from-accent to-accent/50",
    items: [
      { name: "Node.js", status: "connected" },
      { name: "Edge Functions", status: "connected" },
      { name: "Serverless Workers", status: "connected" },
    ],
  },
  {
    category: "infra",
    icon: Database,
    color: "from-success to-success/50",
    items: [
      { name: "Vercel", status: "connected" },
      { name: "GitHub", status: "connected" },
      { name: "Cloudflare", status: "connected" },
      { name: "Supabase", status: "connected" },
      { name: "Xano", status: "available" },
    ],
  },
  {
    category: "ai_models",
    icon: Brain,
    color: "from-warning to-warning/50",
    items: [
      { name: "OpenAI", status: "connected" },
      { name: "OpenRouter", status: "connected" },
      { name: "Gemini", status: "available" },
      { name: "Custom LLM APIs", status: "connected" },
    ],
  },
];

export function IntegrationsHub() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Integrations Hub</h3>
          <p className="text-xs text-muted-foreground">Conexões ativas com serviços externos</p>
        </div>
        <Plug className="w-5 h-5 text-primary" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {integrationCategories.map((category) => (
          <div
            key={category.category}
            className="p-4 rounded-xl bg-secondary/30 border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("p-2 rounded-lg bg-gradient-to-br", category.color)}>
                <category.icon className="w-4 h-4 text-background" />
              </div>
              <span className="font-mono text-sm text-foreground uppercase">{category.category}</span>
            </div>
            
            <div className="space-y-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-sm text-foreground">{item.name}</span>
                  <div className="flex items-center gap-1.5">
                    {item.status === "connected" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        <span className="text-[10px] text-success">connected</span>
                      </>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
