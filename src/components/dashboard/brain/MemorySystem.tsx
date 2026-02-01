import { Database, Zap, Search, Clock, Layers } from "lucide-react";

const memoryLayers = [
  {
    id: "L1_hot",
    name: "Hot Memory (L1)",
    type: "redis_state_memory",
    icon: Zap,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    description: "Real-time state cache",
    latency: "<5ms",
    capacity: "10GB",
  },
  {
    id: "L2_warm",
    name: "Warm Memory (L2)",
    type: "vector_semantic_memory",
    icon: Search,
    color: "text-warning",
    bgColor: "bg-warning/10",
    description: "Semantic search & embeddings",
    latency: "<50ms",
    capacity: "100GB",
  },
  {
    id: "L3_cold",
    name: "Cold Memory (L3)",
    type: "relational_audit_memory",
    icon: Database,
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Full audit & history",
    latency: "<200ms",
    capacity: "1TB+",
  },
];

const features = [
  { name: "context_recall", status: "active" },
  { name: "decision_history", status: "active" },
  { name: "pattern_extraction", status: "active" },
  { name: "semantic_similarity", status: "active" },
];

export function MemorySystem() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Layers className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Memory System</h3>
            <p className="text-xs text-muted-foreground">Multi-layer cognitive memory</p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded bg-success/20 text-success font-mono">
          3 layers
        </span>
      </div>

      {/* Memory Layers */}
      <div className="space-y-3 mb-6">
        {memoryLayers.map((layer, i) => (
          <div
            key={layer.id}
            className="p-4 rounded-lg border border-border bg-secondary/30 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded ${layer.bgColor}`}>
                  <layer.icon className={`w-4 h-4 ${layer.color}`} />
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground">{layer.name}</div>
                  <div className="text-[10px] text-muted-foreground">{layer.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {layer.latency}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{layer.description}</span>
              <span className="font-mono text-foreground">{layer.capacity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Features</div>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature.name}
              className="px-2 py-1 rounded text-xs font-mono bg-primary/10 text-primary border border-primary/20"
            >
              {feature.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
