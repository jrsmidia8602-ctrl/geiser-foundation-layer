-- =====================================================
-- FENIX_86_VNA v1.0.0 — Revenue Optimization Engine
-- VNA: Value-Nurture-Action Conversion Framework
-- =====================================================

-- 1. Extend agent_role enum for FENIX agents
ALTER TYPE public.agent_role ADD VALUE IF NOT EXISTS 'attractor';
ALTER TYPE public.agent_role ADD VALUE IF NOT EXISTS 'qualifier';
ALTER TYPE public.agent_role ADD VALUE IF NOT EXISTS 'nurturer';
ALTER TYPE public.agent_role ADD VALUE IF NOT EXISTS 'closer';
ALTER TYPE public.agent_role ADD VALUE IF NOT EXISTS 'retention';

-- 2. LEADS TABLE
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source TEXT, -- organic, paid, referral, social
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  intent_score INTEGER DEFAULT 0 CHECK (intent_score >= 0 AND intent_score <= 100),
  engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
  readiness_score INTEGER DEFAULT 0 CHECK (readiness_score >= 0 AND readiness_score <= 100),
  objection_tags TEXT[] DEFAULT '{}',
  segment TEXT DEFAULT 'cold', -- cold, warm, hot, customer
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'nurturing', 'qualified', 'opportunity', 'customer', 'churned')),
  first_seen_at TIMESTAMPTZ DEFAULT now(),
  last_activity_at TIMESTAMPTZ DEFAULT now(),
  converted_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SESSIONS TABLE (visitor tracking)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  device_type TEXT, -- mobile, desktop, tablet
  browser TEXT,
  country TEXT,
  landing_page TEXT,
  referrer TEXT,
  page_views INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- 4. TOUCHPOINTS TABLE (interactions)
CREATE TABLE public.touchpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp', 'in-app', 'sms', 'web', 'call')),
  event_type TEXT NOT NULL, -- opened, clicked, replied, viewed, submitted
  content_id UUID,
  offer_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. OFFERS TABLE
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('trial', 'one-time', 'subscription', 'leadmagnet', 'discount', 'payment_plan')),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  headline TEXT,
  description TEXT,
  cta_text TEXT DEFAULT 'Get Started',
  discount_percent INTEGER,
  trial_days INTEGER,
  conditions JSONB DEFAULT '{}', -- min_intent, segments, etc.
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. ORDERS TABLE
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  offer_id UUID REFERENCES public.offers(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT,
  stripe_payment_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ
);

-- 7. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('trialing', 'active', 'past_due', 'cancelled', 'paused')),
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancel_reason TEXT,
  mrr NUMERIC DEFAULT 0, -- Monthly Recurring Revenue
  ltv NUMERIC DEFAULT 0, -- Lifetime Value
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. CONTENT TABLE (for nurturing)
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'whatsapp', 'in-app', 'blog', 'video', 'leadmagnet')),
  subject TEXT,
  body TEXT,
  cta_url TEXT,
  target_segment TEXT[], -- which segments this content targets
  target_stage TEXT[], -- which funnel stages
  send_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. FUNNEL_EVENTS TABLE (analytics)
CREATE TABLE public.funnel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  event_category TEXT, -- acquisition, activation, revenue, retention
  properties JSONB DEFAULT '{}',
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.touchpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Service role + Admin access)
CREATE POLICY "Service role leads" ON public.leads FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Admin leads" ON public.leads FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role sessions" ON public.sessions FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Admin sessions" ON public.sessions FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role touchpoints" ON public.touchpoints FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Admin touchpoints" ON public.touchpoints FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role offers" ON public.offers FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Public read offers" ON public.offers FOR SELECT USING (active = true);

CREATE POLICY "Service role orders" ON public.orders FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Admin orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role subscriptions" ON public.subscriptions FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Users own subscriptions" ON public.subscriptions FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Service role content" ON public.content FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Admin content" ON public.content FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role funnel_events" ON public.funnel_events FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
CREATE POLICY "Public insert funnel_events" ON public.funnel_events FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_leads_tenant ON public.leads(tenant_id);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_segment ON public.leads(segment);
CREATE INDEX idx_leads_intent ON public.leads(intent_score);
CREATE INDEX idx_sessions_lead ON public.sessions(lead_id);
CREATE INDEX idx_touchpoints_lead ON public.touchpoints(lead_id);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_subscriptions_customer ON public.subscriptions(customer_id);
CREATE INDEX idx_funnel_events_lead ON public.funnel_events(lead_id);
CREATE INDEX idx_funnel_events_name ON public.funnel_events(event_name);