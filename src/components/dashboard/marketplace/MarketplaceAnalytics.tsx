import { BarChart3, DollarSign, Bot, Users, Ticket, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  {
    metric: "gross_volume",
    label: "Gross Volume",
    value: "$2.4M",
    change: "+24%",
    trend: "up",
    icon: DollarSign,
  },
  {
    metric: "active_agents_sold",
    label: "Active Agents Sold",
    value: "1,247",
    change: "+18%",
    trend: "up",
    icon: Bot,
  },
  {
    metric: "vendor_revenue",
    label: "Vendor Revenue",
    value: "$1.68M",
    change: "+22%",
    trend: "up",
    icon: Users,
  },
  {
    metric: "average_ticket",
    label: "Average Ticket",
    value: "$89",
    change: "+8%",
    trend: "up",
    icon: Ticket,
  },
  {
    metric: "conversion_rate",
    label: "Conversion Rate",
    value: "4.2%",
    change: "+0.5%",
    trend: "up",
    icon: Target,
  },
];

const topProducts = [
  { name: "Customer Support Agent Pro", sales: 234, revenue: "$21K" },
  { name: "Data Extraction API", sales: 189, revenue: "$17K" },
  { name: "Lead Scoring Workflow", sales: 156, revenue: "$14K" },
  { name: "Document Parser Bundle", sales: 134, revenue: "$12K" },
];

export function MarketplaceAnalytics() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Marketplace Analytics</h3>
          <p className="text-xs text-muted-foreground">Métricas de desempenho do marketplace</p>
        </div>
        <BarChart3 className="w-5 h-5 text-primary" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {metrics.map((item) => (
          <div
            key={item.metric}
            className="p-3 rounded-xl bg-secondary/50 border border-border text-center"
          >
            <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{item.value}</div>
            <div className="text-[10px] text-muted-foreground mb-1">{item.label}</div>
            <span className={cn(
              "text-[10px] font-medium",
              item.trend === "up" ? "text-success" : "text-destructive"
            )}>
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* Top Products */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Top Selling Products</h4>
        <div className="space-y-2">
          {topProducts.map((product, i) => (
            <div
              key={product.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.sales} sales</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{product.revenue}</div>
                <div className="text-[10px] text-muted-foreground">this month</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
