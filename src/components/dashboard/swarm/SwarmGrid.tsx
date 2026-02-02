import { useEffect, useState } from "react";
import { Bot, Zap, Activity, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  role: string;
  priority: string;
  is_leader: boolean;
}

interface AgentState {
  id: string;
  agent_id: string;
  status: string;
  current_task: string | null;
  last_heartbeat: string;
  agents: Agent;
}

const roleColors: Record<string, string> = {
  orchestrator: "from-warning to-warning/50",
  event_router: "from-primary to-primary/50",
  decision_engine: "from-accent to-accent/50",
  policy_guard: "from-destructive to-destructive/50",
  retry_recovery: "from-success to-success/50",
  scheduler: "from-primary to-accent/50",
  insights_generator: "from-accent to-primary/50",
  performance_optimizer: "from-success to-primary/50",
  anomaly_detector: "from-destructive to-warning/50",
  resource_allocator: "from-warning to-success/50",
};

const statusIcons: Record<string, React.ReactNode> = {
  idle: <CheckCircle className="w-4 h-4 text-success" />,
  running: <Loader2 className="w-4 h-4 text-primary animate-spin" />,
  paused: <Activity className="w-4 h-4 text-warning" />,
  error: <AlertTriangle className="w-4 h-4 text-destructive" />,
  recovering: <Loader2 className="w-4 h-4 text-warning animate-spin" />,
  terminated: <AlertTriangle className="w-4 h-4 text-muted-foreground" />,
};

export function SwarmGrid() {
  const [agentStates, setAgentStates] = useState<AgentState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAgentStates();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('swarm-agents')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'agent_states' },
        () => fetchAgentStates()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAgentStates = async () => {
    const { data } = await supabase
      .from('agent_states')
      .select('*, agents(*)')
      .order('agents(priority)', { ascending: false });

    if (data) {
      setAgentStates(data as unknown as AgentState[]);
    }
    setIsLoading(false);
  };

  const formatHeartbeat = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {agentStates.map((state) => (
        <div
          key={state.id}
          className={cn(
            "relative p-4 rounded-xl border transition-all duration-300",
            state.status === 'running' && "ring-2 ring-primary/50 shadow-[0_0_20px_hsl(187_100%_50%/0.2)]",
            state.status === 'error' && "ring-2 ring-destructive/50",
            state.status === 'idle' && "border-border/50 hover:border-primary/30",
          )}
          style={{
            background: `linear-gradient(135deg, hsl(222 47% 10%) 0%, hsl(222 47% 8%) 100%)`,
          }}
        >
          {/* Leader badge */}
          {state.agents?.is_leader && (
            <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-warning text-warning-foreground text-[10px] font-bold">
              LEADER
            </div>
          )}

          {/* Agent icon with role color */}
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
            `bg-gradient-to-br ${roleColors[state.agents?.role] || 'from-muted to-muted/50'}`
          )}>
            <Bot className="w-6 h-6 text-foreground" />
          </div>

          {/* Agent info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{state.agents?.name}</h3>
              {statusIcons[state.status]}
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {state.agents?.role?.replace('_', ' ')}
            </p>
          </div>

          {/* Current task */}
          {state.current_task && (
            <div className="mt-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-primary font-mono truncate">
                  {state.current_task}
                </span>
              </div>
            </div>
          )}

          {/* Heartbeat */}
          <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              state.status === 'idle' ? "bg-success" : 
              state.status === 'running' ? "bg-primary animate-pulse" :
              state.status === 'error' ? "bg-destructive" : "bg-muted"
            )} />
            <span>{formatHeartbeat(state.last_heartbeat)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
