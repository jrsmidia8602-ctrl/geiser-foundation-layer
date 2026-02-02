import { useEffect, useState } from "react";
import { Bot, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AgentActivity {
  agent: string;
  calls: number;
  lastActive: string;
}

export function AgentsActivityWidget() {
  const [agents, setAgents] = useState<AgentActivity[]>([
    { agent: "Sentinel", calls: 0, lastActive: "—" },
    { agent: "Oracle", calls: 0, lastActive: "—" },
    { agent: "Hydra", calls: 0, lastActive: "—" },
  ]);
  const [totalExecutions, setTotalExecutions] = useState(0);

  useEffect(() => {
    fetchAgentActivity();

    // Subscribe to usage updates
    const channel = supabase
      .channel('usage-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'usage',
        },
        () => {
          fetchAgentActivity();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAgentActivity = async () => {
    const { data: usageData } = await supabase
      .from('usage')
      .select(`
        requests,
        created_at,
        licenses!inner(
          products!inner(agent_name)
        )
      `)
      .order('created_at', { ascending: false });

    if (usageData) {
      const agentMap: Record<string, { calls: number; lastActive: string }> = {};
      let total = 0;

      usageData.forEach((u: any) => {
        const agentName = u.licenses?.products?.agent_name || 'Unknown';
        if (!agentMap[agentName]) {
          agentMap[agentName] = { calls: 0, lastActive: u.created_at };
        }
        agentMap[agentName].calls += u.requests || 1;
        total += u.requests || 1;
      });

      const agentList: AgentActivity[] = [
        { agent: "Sentinel", calls: agentMap["Sentinel"]?.calls || 0, lastActive: agentMap["Sentinel"]?.lastActive || "—" },
        { agent: "Oracle", calls: agentMap["Oracle"]?.calls || 0, lastActive: agentMap["Oracle"]?.lastActive || "—" },
        { agent: "Hydra", calls: agentMap["Hydra"]?.calls || 0, lastActive: agentMap["Hydra"]?.lastActive || "—" },
      ];

      setAgents(agentList);
      setTotalExecutions(total);
    }
  };

  const getActivityLevel = (calls: number) => {
    if (calls === 0) return "bg-muted";
    if (calls < 10) return "bg-primary/30";
    if (calls < 50) return "bg-primary/60";
    return "bg-primary animate-pulse";
  };

  const formatTime = (timestamp: string) => {
    if (timestamp === "—") return "—";
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Agentes Autônomos</h3>
            <span className="text-xs text-primary font-mono">{totalExecutions} execuções</span>
          </div>
        </div>
        <Activity className="w-5 h-5 text-primary" />
      </div>

      {/* Activity Heatmap */}
      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.agent}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50"
          >
            <div className={`w-3 h-3 rounded-full ${getActivityLevel(agent.calls)}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{agent.agent}</span>
                <span className="text-sm font-mono text-primary">{agent.calls}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">chamadas</span>
                <span className="text-[10px] text-muted-foreground">
                  {agent.calls > 0 ? `último: ${formatTime(agent.lastActive)}` : "inativo"}
                </span>
              </div>
            </div>
            {/* Mini heatmap */}
            <div className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-sm ${
                    i < Math.min(agent.calls / 5, 8) ? getActivityLevel(agent.calls) : 'bg-muted/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-muted" />
          <span>Inativo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/30" />
          <span>Baixo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <span>Médio</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>Alto</span>
        </div>
      </div>
    </div>
  );
}
