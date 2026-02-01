import { Server, Cloud, Database, Workflow, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const edgeFunctions = [
  { name: "agent-execute", status: "ready" },
  { name: "agent-register", status: "ready" },
  { name: "usage-log", status: "ready" },
  { name: "license-validate", status: "ready" },
];

const infraComponents = [
  { name: "Edge Functions", provider: "Vercel", status: "ready", icon: Cloud },
  { name: "Workers", provider: "Cloudflare", status: "ready", icon: Workflow },
  { name: "Database", provider: "PostgreSQL", status: "ready", icon: Database },
];

const dbRoles = ["state", "telemetry", "billing", "audit"];

const syncModes = [
  { mode: "state_sync", value: "eventual-consistency" },
  { mode: "agent_state", value: "central" },
  { mode: "telemetry", value: "real-time" },
  { mode: "billing", value: "delayed_safe" },
];

export function RuntimeInfrastructure() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Server className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Backend Infrastructure</h3>
            <p className="text-xs text-muted-foreground">Edge functions, workers & database</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-success uppercase">All Systems Ready</span>
        </div>
      </div>

      {/* Infrastructure Components */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {infraComponents.map((comp) => (
          <div
            key={comp.name}
            className="p-3 rounded-lg bg-secondary/50 border border-border text-center"
          >
            <comp.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="text-xs font-medium text-foreground">{comp.name}</div>
            <div className="text-[10px] text-muted-foreground">{comp.provider}</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <CheckCircle className="w-3 h-3 text-success" />
              <span className="text-[10px] text-success">{comp.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edge Functions */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Edge Functions</h4>
        <div className="grid grid-cols-2 gap-2">
          {edgeFunctions.map((fn) => (
            <div
              key={fn.name}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-border"
            >
              <span className="text-xs font-mono text-foreground">{fn.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/20 text-success">{fn.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Database Roles */}
      <div className="mb-6">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Database Roles</h4>
        <div className="flex flex-wrap gap-2">
          {dbRoles.map((role) => (
            <span
              key={role}
              className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 font-mono"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Synchronization */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Sync Modes</h4>
        <div className="space-y-1.5">
          {syncModes.map((sync) => (
            <div key={sync.mode} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{sync.mode.replace("_", " ")}</span>
              <span className="font-mono text-accent">{sync.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
