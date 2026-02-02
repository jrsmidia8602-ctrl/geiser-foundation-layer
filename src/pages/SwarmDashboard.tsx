import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Zap, Shield, Activity } from "lucide-react";
import { SwarmGrid } from "@/components/dashboard/swarm/SwarmGrid";
import { SwarmStats } from "@/components/dashboard/swarm/SwarmStats";
import { SwarmEventLog } from "@/components/dashboard/swarm/SwarmEventLog";
import { SwarmControls } from "@/components/dashboard/swarm/SwarmControls";

const SwarmDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Quantum Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, hsl(260 80% 60% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(187 100% 50% / 0.1) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Link>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-accent" />
                      <h1 className="text-xl font-bold text-foreground">XPEX Autonomous Swarm</h1>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-mono uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    10 agentes autônomos • Execução 24/7 • Auto-recuperação
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Swarm Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
                    <Activity className="w-3 h-3 text-accent" />
                    <span className="text-[10px] text-accent font-mono">DISTRIBUTED</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 border border-success/20">
                    <Shield className="w-3 h-3 text-success" />
                    <span className="text-[10px] text-success font-mono">FAULT-TOLERANT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Value Proposition Banner */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-accent/10 via-primary/5 to-success/10 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Sistema Autônomo 24/7
                </h2>
                <p className="text-sm text-muted-foreground">
                  Agentes executando, decidindo e se corrigindo automaticamente sem intervenção humana.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent font-mono">10</div>
                  <p className="text-[10px] text-muted-foreground">Agents</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-mono">4</div>
                  <p className="text-[10px] text-muted-foreground">Functions</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-success font-mono">6</div>
                  <p className="text-[10px] text-muted-foreground">Tables</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <section className="mb-8">
            <SwarmControls />
          </section>

          {/* Stats */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
              Swarm Metrics
            </h2>
            <SwarmStats />
          </section>

          {/* Agent Grid */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-accent to-success rounded-full" />
              Agent Grid
            </h2>
            <SwarmGrid />
          </section>

          {/* Event Log */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-warning to-primary rounded-full" />
              Event Stream
            </h2>
            <SwarmEventLog />
          </section>

          {/* Sales Signal */}
          <div className="p-4 rounded-xl bg-card/50 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-success font-medium">✓ Proof of Autonomy:</span> Sistema opera e se corrige sozinho, 
              agentes autônomos ativos 24/7 com decisões AI-powered.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-6">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground font-mono">
                XPEX_AUTONOMOUS_SWARM_CORE v1.0.0
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Distributed • Event-driven • Self-healing
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SwarmDashboard;
