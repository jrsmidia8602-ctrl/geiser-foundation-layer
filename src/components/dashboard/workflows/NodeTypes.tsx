import { 
  Bot, 
  GitBranch, 
  GitMerge, 
  Clock, 
  Webhook, 
  User,
  Split
} from "lucide-react";
import { cn } from "@/lib/utils";

const nodeTypes = [
  {
    type: "agent_call",
    name: "Agent Call",
    description: "Executa um agente registrado",
    icon: Bot,
    color: "from-primary to-primary/50",
    count: 45,
  },
  {
    type: "decision_gate",
    name: "Decision Gate",
    description: "Roteamento condicional baseado em regras",
    icon: GitBranch,
    color: "from-accent to-accent/50",
    count: 23,
  },
  {
    type: "parallel_split",
    name: "Parallel Split",
    description: "Divide execução em branches paralelos",
    icon: Split,
    color: "from-success to-success/50",
    count: 12,
  },
  {
    type: "merge",
    name: "Merge",
    description: "Combina resultados de branches",
    icon: GitMerge,
    color: "from-warning to-warning/50",
    count: 12,
  },
  {
    type: "delay",
    name: "Delay",
    description: "Pausa programada na execução",
    icon: Clock,
    color: "from-muted-foreground to-muted-foreground/50",
    count: 8,
  },
  {
    type: "webhook",
    name: "Webhook",
    description: "Chamada HTTP externa",
    icon: Webhook,
    color: "from-primary to-accent",
    count: 18,
  },
  {
    type: "human_input",
    name: "Human Input",
    description: "Aguarda aprovação ou input humano",
    icon: User,
    color: "from-success to-primary",
    count: 6,
  },
];

export function NodeTypes() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <GitBranch className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Node Types</h3>
            <p className="text-xs text-muted-foreground">Building blocks for workflows</p>
          </div>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{nodeTypes.length} types</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer"
          >
            <div className={cn("p-2 rounded-lg bg-gradient-to-br", node.color)}>
              <node.icon className="w-4 h-4 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{node.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{node.count} active</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{node.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Node Schema */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Node Schema</h4>
        <code className="text-[10px] text-muted-foreground font-mono">
          id: uuid | type: string | config: json | on_success | on_failure
        </code>
      </div>
    </div>
  );
}
