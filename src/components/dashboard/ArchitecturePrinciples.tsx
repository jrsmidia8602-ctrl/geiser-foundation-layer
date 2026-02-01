import { Check, Sparkles } from "lucide-react";

const principles = [
  { key: "event_driven", label: "Event Driven", enabled: true },
  { key: "decoupled_modules", label: "Decoupled Modules", enabled: true },
  { key: "audit_first", label: "Audit First", enabled: true },
  { key: "ai_optional", label: "AI Optional (Not Mandatory)", enabled: true },
  { key: "scalable", label: "Scalable by Design", enabled: true },
];

const integrations = [
  { name: "Lovable", ready: true },
  { name: "Vercel", ready: true },
  { name: "GitHub", ready: true },
  { name: "Webhooks", ready: true },
];

const futureAI = ["Gemini", "DeepSeek", "OpenAI", "Claude"];

export function ArchitecturePrinciples() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Architecture Principles</h3>
          <p className="text-xs text-muted-foreground">Core design philosophy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {principles.map((p) => (
          <div
            key={p.key}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
          >
            <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-success" />
            </div>
            <span className="text-sm text-foreground">{p.label}</span>
          </div>
        ))}
      </div>

      {/* Integrations */}
      <div className="border-t border-border pt-4">
        <div className="text-xs text-muted-foreground mb-3">Integrations Ready</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {integrations.map((int) => (
            <span
              key={int.name}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20"
            >
              {int.name}
            </span>
          ))}
        </div>

        <div className="text-xs text-muted-foreground mb-3">Future AI Models</div>
        <div className="flex flex-wrap gap-2">
          {futureAI.map((ai) => (
            <span
              key={ai}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              {ai}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
