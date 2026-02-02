import { useEffect, useState } from "react";
import { Zap, ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface SwarmEvent {
  id: string;
  event_type: string;
  source_agent_id: string | null;
  target_agent_id: string | null;
  priority: string;
  processed: boolean;
  created_at: string;
  payload: Record<string, unknown>;
  source_agent?: { name: string };
  target_agent?: { name: string };
}

const priorityColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-primary/20 text-primary',
  high: 'bg-warning/20 text-warning',
  critical: 'bg-destructive/20 text-destructive',
};

export function SwarmEventLog() {
  const [events, setEvents] = useState<SwarmEvent[]>([]);

  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel('swarm-events-log')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'swarm_events' },
        () => fetchEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('swarm_events')
      .select('*, source_agent:agents!swarm_events_source_agent_id_fkey(name), target_agent:agents!swarm_events_target_agent_id_fkey(name)')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      setEvents(data as unknown as SwarmEvent[]);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Event Log</h3>
        <span className="text-xs text-muted-foreground">({events.length} eventos)</span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum evento registrado
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg border border-border/50 transition-all",
                !event.processed && "bg-primary/5 border-primary/20"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                event.processed ? "bg-success" : "bg-warning animate-pulse"
              )} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground truncate">
                    {event.event_type}
                  </span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                    priorityColors[event.priority]
                  )}>
                    {event.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  {event.source_agent?.name && (
                    <>
                      <span>{event.source_agent.name}</span>
                      {event.target_agent?.name && (
                        <>
                          <ArrowRight className="w-3 h-3" />
                          <span>{event.target_agent.name}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTime(event.created_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
