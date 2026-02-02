import { useState } from "react";
import { Play, RefreshCw, Zap, Brain, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SwarmControls() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const executeAction = async (action: string, payload?: Record<string, unknown>) => {
    setIsLoading(action);
    
    try {
      let endpoint = '';
      let body = {};

      switch (action) {
        case 'bootstrap':
          endpoint = 'swarm_bootstrap';
          body = { mode: 'restart' };
          break;
        case 'dispatch':
          endpoint = 'agent_dispatcher';
          body = {
            event_type: 'manual_task',
            target_role: 'insights_generator',
            payload: { source: 'dashboard', timestamp: new Date().toISOString() },
            priority: 'high',
          };
          break;
        case 'decision':
          endpoint = 'decision_executor';
          body = {
            decision_type: 'performance_optimization',
            context: { current_load: 65, target_latency: 100 },
            options: ['scale_up', 'optimize_cache', 'redistribute_load'],
            require_confidence: 0.6,
          };
          break;
        case 'heal':
          endpoint = 'self_heal_loop';
          body = {};
          break;
        default:
          throw new Error('Unknown action');
      }

      const { data, error } = await supabase.functions.invoke(endpoint, { body });

      if (error) throw error;

      toast.success(`${action} executed successfully`, {
        description: data.message || 'Operation completed',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to execute ${action}`, { description: message });
    } finally {
      setIsLoading(null);
    }
  };

  const controls = [
    {
      id: 'bootstrap',
      label: 'Restart Swarm',
      icon: RefreshCw,
      color: 'bg-warning/10 border-warning/20 text-warning hover:bg-warning/20',
    },
    {
      id: 'dispatch',
      label: 'Dispatch Task',
      icon: Zap,
      color: 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20',
    },
    {
      id: 'decision',
      label: 'AI Decision',
      icon: Brain,
      color: 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20',
    },
    {
      id: 'heal',
      label: 'Self Heal',
      icon: Shield,
      color: 'bg-success/10 border-success/20 text-success hover:bg-success/20',
    },
  ];

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Swarm Controls</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {controls.map((control) => (
          <button
            key={control.id}
            onClick={() => executeAction(control.id)}
            disabled={isLoading !== null}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${control.color} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading === control.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <control.icon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{control.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
