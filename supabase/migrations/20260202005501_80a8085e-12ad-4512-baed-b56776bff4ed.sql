-- =============================================
-- XPEX AUTONOMOUS SWARM CORE - Database Schema
-- =============================================

-- Agent role enum
CREATE TYPE public.agent_role AS ENUM (
  'orchestrator', 
  'event_router', 
  'decision_engine', 
  'policy_guard', 
  'retry_recovery', 
  'scheduler', 
  'insights_generator', 
  'performance_optimizer', 
  'anomaly_detector', 
  'resource_allocator'
);

-- Agent status enum
CREATE TYPE public.agent_status AS ENUM (
  'idle', 
  'running', 
  'paused', 
  'error', 
  'recovering', 
  'terminated'
);

-- Priority enum
CREATE TYPE public.priority_level AS ENUM (
  'low', 
  'medium', 
  'high', 
  'critical'
);

-- Decision status enum
CREATE TYPE public.decision_status AS ENUM (
  'pending', 
  'approved', 
  'rejected', 
  'executed', 
  'failed'
);

-- ===================
-- AGENTS TABLE
-- ===================
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  role agent_role NOT NULL,
  priority priority_level NOT NULL DEFAULT 'medium',
  version TEXT NOT NULL DEFAULT '1.0.0',
  config JSONB DEFAULT '{}',
  is_leader BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- AGENT STATES TABLE
-- ===================
CREATE TABLE public.agent_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  status agent_status NOT NULL DEFAULT 'idle',
  last_heartbeat TIMESTAMPTZ DEFAULT now(),
  current_task TEXT,
  memory JSONB DEFAULT '{}',
  metrics JSONB DEFAULT '{}',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- AGENT EXECUTIONS TABLE
-- ===================
CREATE TABLE public.agent_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  task_type TEXT NOT NULL,
  input JSONB DEFAULT '{}',
  output JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  latency_ms INTEGER,
  cost NUMERIC(10,6) DEFAULT 0,
  error TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- SWARM EVENTS TABLE
-- ===================
CREATE TABLE public.swarm_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  source_agent_id UUID REFERENCES public.agents(id),
  target_agent_id UUID REFERENCES public.agents(id),
  payload JSONB DEFAULT '{}',
  priority priority_level DEFAULT 'medium',
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- DECISIONS TABLE
-- ===================
CREATE TABLE public.decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  decision_type TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  options JSONB DEFAULT '[]',
  selected_option TEXT,
  confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  status decision_status NOT NULL DEFAULT 'pending',
  executed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- SWARM METRICS TABLE
-- ===================
CREATE TABLE public.swarm_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  tags JSONB DEFAULT '{}',
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- INDEXES
-- ===================
CREATE INDEX idx_agent_states_agent ON public.agent_states(agent_id);
CREATE INDEX idx_agent_states_status ON public.agent_states(status);
CREATE INDEX idx_agent_executions_agent ON public.agent_executions(agent_id);
CREATE INDEX idx_agent_executions_status ON public.agent_executions(status);
CREATE INDEX idx_swarm_events_processed ON public.swarm_events(processed) WHERE NOT processed;
CREATE INDEX idx_swarm_events_type ON public.swarm_events(event_type);
CREATE INDEX idx_decisions_agent ON public.decisions(agent_id);
CREATE INDEX idx_decisions_status ON public.decisions(status);
CREATE INDEX idx_swarm_metrics_agent ON public.swarm_metrics(agent_id);
CREATE INDEX idx_swarm_metrics_type ON public.swarm_metrics(metric_type);

-- ===================
-- ENABLE RLS
-- ===================
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swarm_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swarm_metrics ENABLE ROW LEVEL SECURITY;

-- ===================
-- RLS POLICIES - Service role full access
-- ===================
CREATE POLICY "Service role full access to agents"
  ON public.agents FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role full access to agent_states"
  ON public.agent_states FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role full access to agent_executions"
  ON public.agent_executions FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role full access to swarm_events"
  ON public.swarm_events FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role full access to decisions"
  ON public.decisions FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

CREATE POLICY "Service role full access to swarm_metrics"
  ON public.swarm_metrics FOR ALL
  USING ((auth.jwt() ->> 'role') = 'service_role');

-- ===================
-- PUBLIC READ ACCESS (for dashboard)
-- ===================
CREATE POLICY "Public read access to agents"
  ON public.agents FOR SELECT
  USING (true);

CREATE POLICY "Public read access to agent_states"
  ON public.agent_states FOR SELECT
  USING (true);

CREATE POLICY "Public read access to agent_executions"
  ON public.agent_executions FOR SELECT
  USING (true);

CREATE POLICY "Public read access to swarm_events"
  ON public.swarm_events FOR SELECT
  USING (true);

CREATE POLICY "Public read access to decisions"
  ON public.decisions FOR SELECT
  USING (true);

CREATE POLICY "Public read access to swarm_metrics"
  ON public.swarm_metrics FOR SELECT
  USING (true);

-- ===================
-- TRIGGERS
-- ===================
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_states_updated_at
  BEFORE UPDATE ON public.agent_states
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- ENABLE REALTIME
-- ===================
ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_states;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_executions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.swarm_events;