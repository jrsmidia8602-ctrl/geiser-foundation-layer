-- =====================================================
-- XPEX SYSTEMS AI Ω-1.0.0 — PRODUCTION BLUEPRINT
-- Complete multi-tenant infrastructure
-- =====================================================

-- 1. TENANTS TABLE (Multi-tenancy isolation)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),
  settings JSONB DEFAULT '{}'::jsonb,
  max_agents INTEGER DEFAULT 10,
  max_executions_per_day INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add tenant_id to profiles
ALTER TABLE public.profiles
ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL;

-- 3. Add tenant_id to agents
ALTER TABLE public.agents 
ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

-- 4. Add tenant_id to events
ALTER TABLE public.events
ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

-- 5. API KEYS TABLE
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  name TEXT NOT NULL,
  scopes TEXT[] DEFAULT ARRAY['read']::TEXT[],
  rate_limit INTEGER DEFAULT 100,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. BILLING ACCOUNTS TABLE
CREATE TABLE public.billing_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  billing_email TEXT,
  balance_credits NUMERIC DEFAULT 0,
  usage_this_period JSONB DEFAULT '{"executions": 0, "tokens": 0}'::jsonb,
  period_start TIMESTAMPTZ DEFAULT date_trunc('month', now()),
  period_end TIMESTAMPTZ DEFAULT date_trunc('month', now()) + interval '1 month',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. USAGE RECORDS TABLE
CREATE TABLE public.usage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  execution_id UUID REFERENCES public.agent_executions(id) ON DELETE SET NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('execution', 'tokens', 'api_call', 'storage')),
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_cost NUMERIC DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- 8. AUDIT LOGS TABLE
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  actor_id UUID,
  actor_type TEXT CHECK (actor_type IN ('user', 'agent', 'system')),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage tenants" ON public.tenants
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role tenants" ON public.tenants
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Users view api_keys" ON public.api_keys
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users create api_keys" ON public.api_keys
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update api_keys" ON public.api_keys
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Service role api_keys" ON public.api_keys
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Admins billing" ON public.billing_accounts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role billing" ON public.billing_accounts
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Public usage_records" ON public.usage_records
  FOR SELECT USING (true);

CREATE POLICY "Service role usage_records" ON public.usage_records
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Admins audit_logs" ON public.audit_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role audit_logs" ON public.audit_logs
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

-- Indexes
CREATE INDEX idx_api_keys_tenant ON public.api_keys(tenant_id);
CREATE INDEX idx_api_keys_prefix ON public.api_keys(key_prefix);
CREATE INDEX idx_usage_records_tenant ON public.usage_records(tenant_id);
CREATE INDEX idx_audit_logs_tenant ON public.audit_logs(tenant_id);
CREATE INDEX idx_agents_tenant ON public.agents(tenant_id);
CREATE INDEX idx_events_tenant ON public.events(tenant_id);
CREATE INDEX idx_profiles_tenant ON public.profiles(tenant_id);