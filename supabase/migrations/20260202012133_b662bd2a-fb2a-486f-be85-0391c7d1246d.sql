-- Create agent_memory table (without vector embedding for now)
CREATE TABLE IF NOT EXISTS public.agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  memory_type TEXT NOT NULL CHECK (memory_type IN ('short', 'long', 'vector')),
  key TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  embedding_json JSONB,
  ttl_seconds INTEGER,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create events table for event mesh
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL CHECK (source IN ('agent', 'edge', 'external', 'system')),
  event_type TEXT NOT NULL,
  source_agent_id UUID REFERENCES public.agents(id),
  target_agent_id UUID REFERENCES public.agents(id),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  priority priority_level DEFAULT 'medium',
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  result JSONB,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS policies for agent_memory
CREATE POLICY "Public read access to agent_memory" ON public.agent_memory FOR SELECT USING (true);
CREATE POLICY "Service role full access to agent_memory" ON public.agent_memory FOR ALL USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- RLS policies for events
CREATE POLICY "Public read access to events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Service role full access to events" ON public.events FOR ALL USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_memory_type ON public.agent_memory(memory_type);
CREATE INDEX IF NOT EXISTS idx_agent_memory_key ON public.agent_memory(key);
CREATE INDEX IF NOT EXISTS idx_events_processed ON public.events(processed);
CREATE INDEX IF NOT EXISTS idx_events_source ON public.events(source);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON public.events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_memory;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;

-- Trigger for updated_at on agent_memory
CREATE TRIGGER update_agent_memory_updated_at
BEFORE UPDATE ON public.agent_memory
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();