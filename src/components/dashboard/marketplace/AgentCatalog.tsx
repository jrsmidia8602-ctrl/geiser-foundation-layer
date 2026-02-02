import { useEffect, useState } from "react";
import { Bot, Zap, Shield, TrendingUp, DollarSign, Play, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Product {
  id: string;
  product_id: string;
  name: string;
  agent_name: string;
  description: string;
  price: number;
  billing_type: string;
  currency: string;
  active: boolean;
}

const categoryIcons: Record<string, typeof Bot> = {
  "Growth": TrendingUp,
  "Sales": DollarSign,
  "Security": Shield,
  "default": Bot,
};

const categoryColors: Record<string, string> = {
  "Growth": "from-success to-success/50",
  "Sales": "from-warning to-warning/50",
  "Security": "from-destructive to-destructive/50",
  "default": "from-primary to-primary/50",
};

function getCategory(name: string): string {
  if (name.toLowerCase().includes("growth")) return "Growth";
  if (name.toLowerCase().includes("sales") || name.toLowerCase().includes("closer")) return "Sales";
  if (name.toLowerCase().includes("security") || name.toLowerCase().includes("sentinel")) return "Security";
  return "default";
}

function formatPrice(price: number, billingType: string): string {
  if (billingType === "per_request") {
    return `$${price.toFixed(2)}/exec`;
  }
  if (billingType === "monthly") {
    return `$${price}/mo`;
  }
  return `$${price}`;
}

export function AgentCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const handlePurchase = async (product: Product) => {
    toast.info(`Iniciando checkout para ${product.name}...`);
    
    try {
      const { data, error } = await supabase.functions.invoke("marketplace_checkout", {
        body: {
          product_id: product.product_id,
          customer_email: "demo@xpex.ai",
        },
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Compra realizada! License: ${data.license_key}`, {
          duration: 5000,
        });
      } else {
        toast.error(data?.error || "Erro no checkout");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Erro ao processar checkout");
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Separate marketplace agents from system packages
  const marketplaceAgents = products.filter(p => 
    ["GROWTH_ALPHA", "SALES_CLOSER_AI", "SECURITY_SENTINEL"].includes(p.product_id)
  );
  
  const systemPackages = products.filter(p => 
    !["GROWTH_ALPHA", "SALES_CLOSER_AI", "SECURITY_SENTINEL"].includes(p.product_id)
  );

  return (
    <div className="space-y-8">
      {/* Marketplace Agents */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              Agent Marketplace
            </h3>
            <p className="text-xs text-muted-foreground">Agentes autônomos prontos para compra</p>
          </div>
          <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
            {marketplaceAgents.length} disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketplaceAgents.map((product) => {
            const category = getCategory(product.name);
            const Icon = categoryIcons[category] || categoryIcons.default;
            const colorClass = categoryColors[category] || categoryColors.default;

            return (
              <div
                key={product.id}
                className="group relative p-5 rounded-xl border border-border/50 bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50 transition-all overflow-hidden"
              >
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", colorClass)} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-2.5 rounded-lg bg-gradient-to-br", colorClass)}>
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs text-muted-foreground">4.9</span>
                    </div>
                  </div>

                  {/* Info */}
                  <h4 className="font-semibold text-foreground mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] border border-border">
                      {product.billing_type === "monthly" ? "Subscription" : "Pay-per-use"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] border border-primary/20">
                      {category}
                    </span>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(product.price, product.billing_type)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(product)}
                      className="gap-1"
                    >
                      <Play className="w-3 h-3" />
                      Ativar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Packages */}
      {systemPackages.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Infrastructure Packages
              </h3>
              <p className="text-xs text-muted-foreground">Pacotes completos de infraestrutura AI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemPackages.map((product) => (
              <div
                key={product.id}
                className="group p-4 rounded-xl border border-border/50 bg-secondary/20 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/50">
                    <Bot className="w-4 h-4 text-background" />
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1">{product.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {product.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => handlePurchase(product)}
                >
                  Comprar
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
