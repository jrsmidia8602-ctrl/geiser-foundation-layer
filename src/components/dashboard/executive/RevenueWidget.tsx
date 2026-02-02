import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Transaction {
  amount: number;
  status: string;
  created_at: string;
}

export function RevenueWidget() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Fetch initial data
    fetchRevenue();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('transactions-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
        },
        (payload) => {
          const newTx = payload.new as Transaction;
          if (newTx.status === 'completed') {
            setTotalRevenue(prev => prev + Number(newTx.amount));
            setTodayRevenue(prev => prev + Number(newTx.amount));
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRevenue = async () => {
    const { data: allTx } = await supabase
      .from('transactions')
      .select('amount, status, created_at')
      .eq('status', 'completed');

    if (allTx) {
      const total = allTx.reduce((sum, tx) => sum + Number(tx.amount), 0);
      setTotalRevenue(total);

      const today = new Date().toISOString().split('T')[0];
      const todayTxs = allTx.filter(tx => tx.created_at?.startsWith(today));
      const todayTotal = todayTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
      setTodayRevenue(todayTotal);
    }
  };

  return (
    <div className={`glass-card p-6 transition-all duration-500 ${isAnimating ? 'ring-2 ring-success/50 shadow-[0_0_30px_hsl(142_76%_45%/0.3)]' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-success/10 border border-success/20">
            <DollarSign className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Receita em Tempo Real</h3>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-success animate-pulse" />
              <span className="text-[10px] text-success font-mono">LIVE</span>
            </div>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-success" />
      </div>

      <div className="space-y-3">
        <div>
          <div className={`text-4xl font-bold text-foreground font-mono transition-transform ${isAnimating ? 'scale-105' : ''}`}>
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Total processado</p>
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hoje</span>
            <span className="text-lg font-semibold text-success font-mono">
              +${todayRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-success/20 text-success text-[10px] font-mono animate-bounce">
            +PAYMENT
          </div>
        </div>
      )}
    </div>
  );
}
