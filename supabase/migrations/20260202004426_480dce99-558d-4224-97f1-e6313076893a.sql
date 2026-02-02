-- =============================================
-- MARKETPLACE SCHEMA FOR XPEX SYSTEMS AI
-- =============================================

-- Products table (Agent API products)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL UNIQUE,
  agent_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_type TEXT NOT NULL CHECK (billing_type IN ('one-time', 'monthly', 'yearly', 'per_request')),
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  stripe_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Licenses table (API keys for purchased products)
CREATE TABLE public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key TEXT NOT NULL UNIQUE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Usage tracking table
CREATE TABLE public.usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES public.licenses(id) ON DELETE CASCADE,
  requests INTEGER DEFAULT 1,
  endpoint TEXT,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  license_id UUID REFERENCES public.licenses(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_products_active ON public.products(active);
CREATE INDEX idx_products_billing ON public.products(billing_type);
CREATE INDEX idx_customers_user ON public.customers(user_id);
CREATE INDEX idx_customers_stripe ON public.customers(stripe_customer_id);
CREATE INDEX idx_licenses_customer ON public.licenses(customer_id);
CREATE INDEX idx_licenses_product ON public.licenses(product_id);
CREATE INDEX idx_licenses_key ON public.licenses(license_key);
CREATE INDEX idx_usage_license ON public.usage(license_id);
CREATE INDEX idx_usage_created ON public.usage(created_at);
CREATE INDEX idx_transactions_customer ON public.transactions(customer_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (active = true);

CREATE POLICY "Service role can manage products"
ON public.products FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Customers: Users can view/manage their own data
CREATE POLICY "Users can view their own customer record"
ON public.customers FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customer record"
ON public.customers FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer record"
ON public.customers FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage customers"
ON public.customers FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Licenses: Users can view their own licenses
CREATE POLICY "Users can view their own licenses"
ON public.licenses FOR SELECT
USING (
  customer_id IN (
    SELECT id FROM public.customers WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Service role can manage licenses"
ON public.licenses FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Usage: Users can view their own usage
CREATE POLICY "Users can view their own usage"
ON public.usage FOR SELECT
USING (
  license_id IN (
    SELECT l.id FROM public.licenses l
    JOIN public.customers c ON l.customer_id = c.id
    WHERE c.user_id = auth.uid()
  )
);

CREATE POLICY "Service role can manage usage"
ON public.usage FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Transactions: Users can view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (
  customer_id IN (
    SELECT id FROM public.customers WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Service role can manage transactions"
ON public.transactions FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Generate a unique license key
CREATE OR REPLACE FUNCTION public.generate_license_key()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  key TEXT;
BEGIN
  key := 'XG_' || upper(encode(gen_random_bytes(16), 'hex'));
  RETURN key;
END;
$$;

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add update triggers
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at
BEFORE UPDATE ON public.licenses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();