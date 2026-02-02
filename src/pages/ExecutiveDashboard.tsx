import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Eye, Lock, Users, Shield } from "lucide-react";
import { RevenueWidget } from "@/components/dashboard/executive/RevenueWidget";
import { AgentsActivityWidget } from "@/components/dashboard/executive/AgentsActivityWidget";
import { APIRequestsWidget } from "@/components/dashboard/executive/APIRequestsWidget";
import { ClientsWidget } from "@/components/dashboard/executive/ClientsWidget";
import { SystemHealthWidget } from "@/components/dashboard/executive/SystemHealthWidget";
import { GrowthProjectionWidget } from "@/components/dashboard/executive/GrowthProjectionWidget";

const ExecutiveDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Quantum Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, hsl(187 100% 50% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(260 80% 60% / 0.1) 0%, transparent 50%)'
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
                      <Zap className="w-5 h-5 text-primary" />
                      <h1 className="text-xl font-bold text-foreground">XPEX Executive Dashboard</h1>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-mono uppercase">
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Sistema ativo • Agentes executando • Receita mensurável
                  </p>
                </div>
              </div>

              {/* Access Level Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground">Buyer View</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10 border border-warning/20">
                    <Shield className="w-3 h-3 text-warning" />
                    <span className="text-[10px] text-warning font-mono">ADMIN</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-[10px] text-primary font-mono">BUYER</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
                    <Lock className="w-3 h-3 text-accent" />
                    <span className="text-[10px] text-accent font-mono">INVESTOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Value Proposition Banner */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Prova de Valor em Tempo Real
                </h2>
                <p className="text-sm text-muted-foreground">
                  Dados ao vivo demonstrando execução autônoma, monetização ativa e crescimento projetado.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary font-mono">3</div>
                  <p className="text-[10px] text-muted-foreground">Agentes Ativos</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-success font-mono">5</div>
                  <p className="text-[10px] text-muted-foreground">Tabelas DB</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent font-mono">3</div>
                  <p className="text-[10px] text-muted-foreground">Edge Functions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Row 1: Revenue + Clients + System Health */}
            <RevenueWidget />
            <ClientsWidget />
            <SystemHealthWidget />
            
            {/* Row 2: Agents Activity + API Requests */}
            <AgentsActivityWidget />
            <APIRequestsWidget />
            
            {/* Row 3: Growth Projection (full width on lg) */}
            <GrowthProjectionWidget />
          </div>

          {/* Sales Mode Footer */}
          <div className="mt-8 p-4 rounded-xl bg-card/50 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="text-success font-medium">✓ Proof of Execution:</span> Sistema ativo com agentes executando, 
              receita sendo processada e métricas em tempo real.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-6">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground font-mono">
                XPEX_SYSTEMS_AI_DASHBOARD v1.0.0
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Real-time data • AI-powered insights • Enterprise ready
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
