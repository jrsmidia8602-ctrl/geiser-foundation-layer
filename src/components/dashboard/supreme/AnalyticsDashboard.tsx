import { BarChart3, TrendingUp, TrendingDown, Brain, AlertTriangle, DollarSign, Users, RefreshCw, Percent } from "lucide-react";

export function AnalyticsDashboard() {
  const metrics = [
    { id: "LTV", label: "Lifetime Value", value: "$847", change: "+12%", trend: "up" },
    { id: "CAC", label: "Customer Acquisition", value: "$42", change: "-8%", trend: "down" },
    { id: "ROI", label: "Return on Investment", value: "324%", change: "+18%", trend: "up" },
    { id: "conversion_rate", label: "Conversion Rate", value: "4.7%", change: "+0.3%", trend: "up" },
    { id: "ARPU", label: "Avg Revenue/User", value: "$127", change: "+5%", trend: "up" },
    { id: "churn", label: "Churn Rate", value: "2.1%", change: "-0.4%", trend: "down" },
  ];

  const predictiveModels = [
    { id: "revenue-forecast", label: "Revenue Forecast", prediction: "$124K", confidence: "92%", icon: DollarSign },
    { id: "offer-fatigue-detection", label: "Offer Fatigue", prediction: "Low Risk", confidence: "87%", icon: AlertTriangle },
    { id: "churn-risk", label: "Churn Risk", prediction: "23 users", confidence: "84%", icon: Users },
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analytics & Predictions</h3>
            <p className="text-xs text-muted-foreground">Real-time metrics with AI forecasting</p>
          </div>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
          <RefreshCw className="w-3 h-3 animate-spin" />
          live
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <div className={`flex items-center gap-1 text-xs ${
                (metric.id === 'CAC' || metric.id === 'churn') 
                  ? (metric.trend === 'down' ? 'text-success' : 'text-destructive')
                  : (metric.trend === 'up' ? 'text-success' : 'text-destructive')
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>
            <div className="text-xl font-bold text-foreground">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Predictive models */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Brain className="w-4 h-4 text-accent" />
          Predictive Models
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {predictiveModels.map((model) => (
            <div key={model.id} className="p-3 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <model.icon className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">{model.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-foreground">{model.prediction}</span>
                <span className="text-xs font-mono text-success">{model.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
