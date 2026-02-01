import { Target, Users, Rocket } from "lucide-react";

const buyers = [
  "Startups",
  "SaaS Creators",
  "Agencies",
  "Automation Companies",
  "AI Builders",
];

const benefits = [
  "Reduces development time",
  "Avoids refactoring",
  "Scales without pain",
  "Sell agents & APIs on-demand",
];

export function ValueProposition() {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Rocket className="w-5 h-5 text-background" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Value Proposition</h3>
          <p className="text-xs text-muted-foreground">Modular Infrastructure for Sale</p>
        </div>
      </div>

      {/* Who buys */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Users className="w-4 h-4" />
          Who buys this?
        </div>
        <div className="flex flex-wrap gap-2">
          {buyers.map((buyer) => (
            <span
              key={buyer}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-foreground border border-border"
            >
              {buyer}
            </span>
          ))}
        </div>
      </div>

      {/* Why it matters */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Target className="w-4 h-4" />
          Why it matters
        </div>
        <div className="space-y-2">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
            >
              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-xs font-mono text-success">
                {i + 1}
              </div>
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
