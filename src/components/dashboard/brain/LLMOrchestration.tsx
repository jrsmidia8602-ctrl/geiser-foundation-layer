import { Sparkles, ArrowRight, Zap, DollarSign, Target, RefreshCw } from "lucide-react";

const supportedModels = [
  { name: "openai", status: "connected", latency: "120ms", cost: "$$" },
  { name: "anthropic", status: "connected", latency: "150ms", cost: "$$$" },
  { name: "gemini", status: "connected", latency: "80ms", cost: "$" },
  { name: "local_llm", status: "available", latency: "50ms", cost: "free" },
];

const strategies = [
  {
    name: "cheap_first",
    description: "Try cheapest model, fallback if confidence low",
    active: true,
    icon: DollarSign,
  },
  {
    name: "fallback_chain",
    description: "Ordered chain of model fallbacks",
    active: false,
    icon: RefreshCw,
  },
  {
    name: "confidence_weighted_selection",
    description: "Route based on task confidence requirements",
    active: false,
    icon: Target,
  },
];

export function LLMOrchestration() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">LLM Orchestration</h3>
            <p className="text-xs text-muted-foreground">Multi-model routing & management</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-primary/20 text-primary font-mono">
          model_router
        </span>
      </div>

      {/* Supported Models */}
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Supported Models</div>
        <div className="grid grid-cols-2 gap-2">
          {supportedModels.map((model) => (
            <div
              key={model.name}
              className={`p-3 rounded-lg border ${
                model.status === "connected"
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-foreground">{model.name}</span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    model.status === "connected" ? "bg-success" : "bg-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {model.latency}
                </span>
                <span className="font-mono text-warning">{model.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Routing Strategies */}
      <div>
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Routing Strategies</div>
        <div className="space-y-2">
          {strategies.map((strategy) => (
            <div
              key={strategy.name}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                strategy.active
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-secondary/30"
              }`}
            >
              <strategy.icon
                className={`w-4 h-4 ${strategy.active ? "text-primary" : "text-muted-foreground"}`}
              />
              <div className="flex-1">
                <div className={`font-mono text-xs ${strategy.active ? "text-primary" : "text-foreground"}`}>
                  {strategy.name}
                </div>
                <div className="text-[10px] text-muted-foreground">{strategy.description}</div>
              </div>
              {strategy.active && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary font-mono">
                  active
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
