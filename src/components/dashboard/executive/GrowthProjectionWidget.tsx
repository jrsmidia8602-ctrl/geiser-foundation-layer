import { useState, useEffect } from "react";
import { TrendingUp, Sparkles, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";

interface ProjectionData {
  day: string;
  actual: number;
  projected: number;
}

export function GrowthProjectionWidget() {
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([]);
  const [growthRate, setGrowthRate] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);

  useEffect(() => {
    // Generate AI-style projection data
    const data: ProjectionData[] = [];
    let baseValue = 1200;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayLabel = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      
      // Simulated actual data (first 5 days) vs projection
      const isActual = i < 5;
      const growth = 1.08 + (Math.random() * 0.04); // 8-12% daily growth
      baseValue *= growth;
      
      data.push({
        day: dayLabel,
        actual: isActual ? Math.round(baseValue) : 0,
        projected: Math.round(baseValue),
      });
    }

    setProjectionData(data);
    setGrowthRate(32); // Simulated 32% growth projection
    setProjectedRevenue(Math.round(baseValue));
  }, []);

  return (
    <div className="glass-card p-6 col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Projeção de Crescimento</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-mono">AI FORECAST</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">30 dias</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center gap-1 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-lg font-bold font-mono">+{growthRate}%</span>
            </div>
            <p className="text-[10px] text-muted-foreground">taxa de crescimento</p>
          </div>
          <div className="text-right pl-4 border-l border-border">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-lg font-bold font-mono text-accent">${(projectedRevenue / 1000).toFixed(1)}K</span>
            </div>
            <p className="text-[10px] text-muted-foreground">receita projetada</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <defs>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(187 100% 50%)" />
                <stop offset="100%" stopColor="hsl(260 80% 60%)" />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }}
              interval={4}
            />
            <YAxis 
              hide 
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222 47% 10%)',
                border: '1px solid hsl(222 30% 18%)',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(210 40% 98%)' }}
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`,
                name === 'actual' ? 'Real' : 'Projetado'
              ]}
            />
            <ReferenceLine 
              x={projectionData[4]?.day} 
              stroke="hsl(222 30% 30%)" 
              strokeDasharray="3 3"
              label={{ value: 'HOJE', fill: 'hsl(215 20% 55%)', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="url(#projectedGradient)"
              strokeWidth={3}
              dot={false}
              strokeDasharray="0"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(142 76% 45%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(142 76% 45%)', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-success rounded-full" />
          <span>Dados Reais</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
          <span>Projeção AI</span>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Insight do AI</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Baseado na taxa de conversão atual de 12.4% e crescimento de clientes, 
              projetamos atingir ${(projectedRevenue / 1000).toFixed(1)}K em receita nos próximos 30 dias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
