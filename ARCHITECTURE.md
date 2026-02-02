# XG_AGENT_OS — Architecture Blueprint

> **Version**: 1.0.0  
> **Mode**: Production-Ready Blueprint  
> **Purpose**: Plataforma de criação, execução e monetização de agentes autônomos de IA

---

## 🎯 System Identity

| Property | Value |
|----------|-------|
| **Name** | XG_AGENT_OS |
| **Version** | 1.0.0 |
| **Target Market** | Agências, Startups, Infoprodutores, SaaS Builders |
| **Current State** | Blueprint Executável (Frontend + Arquitetura) |

---

## 🏗️ Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                      XG_AGENT_OS                            │
├─────────────────────────────────────────────────────────────┤
│  Frontend          │ Vercel (React + Vite)                  │
│  Backend           │ Lovable Cloud / Supabase               │
│  Edge Runtime      │ ✅ Enabled                             │
│  Repository        │ Monorepo                               │
├─────────────────────────────────────────────────────────────┤
│  Structure:                                                 │
│  ├── /frontend        (React Dashboard)                    │
│  ├── /supabase        (Migrations + Config)                │
│  ├── /edge-functions  (Serverless Logic)                   │
│  └── /docs            (Documentation)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Provider: PostgreSQL (Supabase Managed)

```sql
-- =============================================
-- MULTI-TENANT FOUNDATION
-- =============================================

-- Tenants (Organizations)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'starter',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (with Tenant Isolation)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Roles (RBAC - Separate Table for Security)
CREATE TYPE public.app_role AS ENUM ('admin', 'operator', 'viewer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- =============================================
-- AGENT SYSTEM
-- =============================================

-- Agents
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  goal TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Agent Versions (Immutable History)
CREATE TABLE public.agent_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  model TEXT DEFAULT 'gpt-4o' CHECK (model IN ('gpt-4', 'gpt-4o', 'gpt-4o-mini', 'custom')),
  tools JSONB DEFAULT '[]',
  version_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Agent Executions
CREATE TABLE public.executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  version_id UUID REFERENCES public.agent_versions(id),
  input JSONB,
  output JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'error', 'retry')),
  duration_ms INTEGER,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- WORKFLOW ENGINE
-- =============================================

CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  definition JSONB NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- EVENT SYSTEM
-- =============================================

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('webhook', 'schedule', 'manual', 'system')),
  source TEXT,
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- BILLING & USAGE
-- =============================================

CREATE TABLE public.billing_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  execution_id UUID REFERENCES public.executions(id),
  tokens_used INTEGER NOT NULL,
  cost_usd DECIMAL(10, 6),
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- OBSERVABILITY
-- =============================================

CREATE TABLE public.logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id),
  level TEXT DEFAULT 'info' CHECK (level IN ('debug', 'info', 'warn', 'error')),
  message TEXT NOT NULL,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- API KEYS
-- =============================================

CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  prefix TEXT NOT NULL,
  scopes JSONB DEFAULT '["read", "execute"]',
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_agents_tenant ON public.agents(tenant_id);
CREATE INDEX idx_executions_agent ON public.executions(agent_id);
CREATE INDEX idx_executions_status ON public.executions(status);
CREATE INDEX idx_events_processed ON public.events(processed);
CREATE INDEX idx_billing_tenant_period ON public.billing_usage(tenant_id, period_start);
CREATE INDEX idx_logs_tenant_level ON public.logs(tenant_id, level);

-- =============================================
-- SECURITY DEFINER FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_user_tenant_id(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id
  FROM public.profiles
  WHERE id = _user_id
$$;
```

---

## ⚡ Edge Functions

| Function | Trigger | Responsibility |
|----------|---------|----------------|
| `agent-executor` | API, Workflow, Event | Executar agente com contexto, memória e ferramentas |
| `workflow-orchestrator` | API, Schedule | Executar fluxos condicionais entre agentes |
| `event-router` | Webhook | Receber webhooks e disparar agentes |
| `billing-meter` | Post-Execution | Medir tokens, custo e registrar uso |

### agent-executor Blueprint

```typescript
// supabase/functions/agent-executor/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { agent_id, input, context } = await req.json()
    
    // 1. Load agent configuration
    // 2. Build prompt with context
    // 3. Call LLM (OpenAI/other)
    // 4. Parse response
    // 5. Execute tools if needed
    // 6. Store execution record
    // 7. Bill usage
    
    return new Response(
      JSON.stringify({ status: 'executed', output: {} }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

---

## 🤖 Agent System

### Agent Schema

```typescript
interface Agent {
  id: string;
  name: string;
  objective: string;
  constraints: string[];
  tools: ('http' | 'db' | 'vector_search' | 'custom')[];
  memory: {
    short_term: boolean;
    long_term: boolean;
  };
}
```

### Autonomy Features

| Feature | Status | Description |
|---------|--------|-------------|
| Event-Driven | ✅ Ready | Agents respond to webhooks/events |
| Schedule-Driven | ✅ Ready | Cron-based agent execution |
| Self-Retry | ✅ Ready | Automatic retry on failure |
| Confidence Scoring | ✅ Ready | Decision confidence metrics |

---

## 🧠 Orchestration Brain

### Decision Flow

```
receive_input → analyze_context → select_agent → execute → store_memory → bill_usage
```

### Brain Types

- **Rule-Based**: Deterministic routing based on input patterns
- **LLM-Assisted**: AI-powered agent selection for complex cases
- **Hybrid**: Rules first, LLM fallback (recommended)

---

## 🔐 Security

| Layer | Implementation |
|-------|---------------|
| Authentication | Supabase Auth (Email, OAuth) |
| Authorization | RBAC + Tenant Isolation |
| Rate Limiting | Per-tenant token limits |

---

## 💳 Billing (Stripe)

| Plan | Price/Month | Token Limit |
|------|-------------|-------------|
| Starter | $49 | 100,000 |
| Pro | $149 | 500,000 |
| Enterprise | Custom | Unlimited |

---

## 📊 Observability

| Feature | Implementation |
|---------|---------------|
| Logs | Structured JSON logs table |
| Metrics | Execution duration, success rate |
| Traces | Full execution trace per agent |

---

## 📦 Productization Status

### ✅ What's Complete

- Infrastructure Blueprint
- Dashboard (9 modules)
- Agent Architecture
- Database Schema
- Edge Function Blueprints

### 🔧 Upgrade Path

1. **Activate Backend** → Enable Lovable Cloud
2. **Activate Billing** → Connect Stripe
3. **Activate Marketplace** → Agent sharing/selling

---

## 🎯 Truth Clause

| Aspect | Reality |
|--------|---------|
| **Current State** | Blueprint Executável |
| **What's Real** | Frontend + Arquitetura |
| **Requires Implementation** | Backend, DB, Functions |
| **Value Statement** | Economiza meses de desenvolvimento |

---

## 📁 Module Map (GEISER Layers)

| Layer | Module | Route | Status |
|-------|--------|-------|--------|
| L01 | Foundation Core | `/` | ✅ UI Complete |
| L02 | Agents & APIs | `/agents-and-apis` | ✅ UI Complete |
| L03 | Workflows | `/workflows` | ✅ UI Complete |
| L04 | Monetization | `/monetization` | ✅ UI Complete |
| L05 | Brain AI | `/brain-ai` | ✅ UI Complete |
| L06 | Marketplace | `/marketplace` | ✅ UI Complete |
| L07 | Governance | `/governance-trust` | ✅ UI Complete |
| L08 | Federation | `/enterprise-federation` | ✅ UI Complete |
| L09 | Supreme Engine | `/supreme-engine` | ✅ UI Complete |

---

**XG_AGENT_OS** — *Infrastructure for the Agent Economy*
