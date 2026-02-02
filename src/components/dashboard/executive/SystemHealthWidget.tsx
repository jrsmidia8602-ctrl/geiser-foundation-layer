import { useState, useEffect } from "react";
import { Activity, CheckCircle, AlertTriangle, Server, Database, Cloud } from "lucide-react";

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  latency: number;
  icon: React.ElementType;
}

export function SystemHealthWidget() {
  const [uptime, setUptime] = useState(99.97);
  const [systems, setSystems] = useState<SystemStatus[]>([
    { name: "API Gateway", status: "operational", latency: 45, icon: Cloud },
    { name: "Edge Functions", status: "operational", latency: 128, icon: Server },
    { name: "Database", status: "operational", latency: 12, icon: Database },
  ]);

  useEffect(() => {
    // Simulate real-time health checks
    const interval = setInterval(() => {
      setSystems(prev => prev.map(sys => ({
        ...sys,
        latency: Math.max(5, sys.latency + Math.floor(Math.random() * 20) - 10),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-success bg-success/10 border-success/20";
      case "degraded": return "text-warning bg-warning/10 border-warning/20";
      case "down": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return <CheckCircle className="w-4 h-4 text-success" />;
      case "degraded": return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "down": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  const allOperational = systems.every(s => s.status === "operational");

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${allOperational ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'}`}>
            <Activity className={`w-6 h-6 ${allOperational ? 'text-success' : 'text-warning'}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Saúde do Sistema</h3>
            <span className={`text-xs font-mono ${allOperational ? 'text-success' : 'text-warning'}`}>
              {allOperational ? 'ALL SYSTEMS OPERATIONAL' : 'PARTIAL DEGRADATION'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground font-mono">{uptime}%</div>
          <p className="text-[10px] text-muted-foreground">uptime</p>
        </div>
      </div>

      {/* System Status List */}
      <div className="space-y-3">
        {systems.map((system) => (
          <div
            key={system.name}
            className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(system.status)}`}
          >
            <div className="flex items-center gap-3">
              <system.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{system.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">{system.latency}ms</span>
              {getStatusIcon(system.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-muted-foreground">Últimas 24h</span>
        </div>
        <div className="flex gap-0.5">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-4 rounded-sm ${
                Math.random() > 0.02 ? 'bg-success/60' : 'bg-warning/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
