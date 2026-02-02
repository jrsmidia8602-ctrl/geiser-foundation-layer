import { useEffect, useState } from "react";
import { Users, UserPlus, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CustomerStats {
  total: number;
  active: number;
  newToday: number;
}

export function ClientsWidget() {
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    active: 0,
    newToday: 0,
  });
  const [recentCustomers, setRecentCustomers] = useState<string[]>([]);

  useEffect(() => {
    fetchCustomerStats();

    const channel = supabase
      .channel('customers-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customers',
        },
        () => {
          fetchCustomerStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCustomerStats = async () => {
    const { data: customers } = await supabase
      .from('customers')
      .select('email, status, created_at')
      .order('created_at', { ascending: false });

    if (customers) {
      const today = new Date().toISOString().split('T')[0];
      const activeCount = customers.filter(c => c.status === 'active').length;
      const todayCount = customers.filter(c => c.created_at?.startsWith(today)).length;

      setStats({
        total: customers.length,
        active: activeCount,
        newToday: todayCount,
      });

      // Get recent 3 customers (masked emails)
      const recent = customers.slice(0, 3).map(c => {
        const [name, domain] = c.email.split('@');
        return `${name.substring(0, 3)}***@${domain}`;
      });
      setRecentCustomers(recent);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
            <Users className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Clientes Ativos</h3>
            <span className="text-xs text-warning font-mono">marketplace</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-success">+{stats.newToday}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-foreground font-mono">{stats.total}</div>
        <p className="text-sm text-muted-foreground mt-1">clientes registrados</p>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
          <div className="text-xl font-bold text-success font-mono">{stats.active}</div>
          <p className="text-[10px] text-muted-foreground">Ativos</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <div className="text-xl font-bold text-primary font-mono">{stats.newToday}</div>
          <p className="text-[10px] text-muted-foreground">Hoje</p>
        </div>
      </div>

      {/* Recent Customers */}
      {recentCustomers.length > 0 && (
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Últimos Cadastros
          </h4>
          <div className="space-y-1">
            {recentCustomers.map((email, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <Crown className="w-3 h-3 text-warning/50" />
                <span className="font-mono text-foreground/70">{email}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
