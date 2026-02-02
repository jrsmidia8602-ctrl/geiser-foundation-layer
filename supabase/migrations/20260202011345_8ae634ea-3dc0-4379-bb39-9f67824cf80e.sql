-- Add new agent roles for swarm engine
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'planner';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'executor';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'validator';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'optimizer';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'watchdog';

-- Create tasks table for swarm task management
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL UNIQUE,
  agent_id UUID REFERENCES public.agents(id),
  parent_task_id UUID REFERENCES public.tasks(id),
  task_type TEXT NOT NULL,
  description TEXT,
  state TEXT NOT NULL DEFAULT 'pending' CHECK (state IN ('pending', 'assigned', 'running', 'done', 'failed', 'cancelled')),
  priority priority_level NOT NULL DEFAULT 'medium',
  input JSONB DEFAULT '{}'::jsonb,
  output JSONB,
  error TEXT,
  confidence_score NUMERIC,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create swarm_logs table for comprehensive logging
CREATE TABLE IF NOT EXISTS public.swarm_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  log_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  agent_id UUID REFERENCES public.agents(id),
  task_id UUID REFERENCES public.tasks(id),
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('debug', 'info', 'warn', 'error', 'critical')),
  message TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swarm_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for tasks
CREATE POLICY "Public read access to tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Service role full access to tasks" ON public.tasks FOR ALL USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- RLS policies for swarm_logs
CREATE POLICY "Public read access to swarm_logs" ON public.swarm_logs FOR SELECT USING (true);
CREATE POLICY "Service role full access to swarm_logs" ON public.swarm_logs FOR ALL USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Add confidence_score to agents table
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS confidence_score NUMERIC DEFAULT 1.0;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS max_parallel INTEGER DEFAULT 10;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS rate_limit INTEGER DEFAULT 100;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_state ON public.tasks(state);
CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON public.tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_swarm_logs_agent_id ON public.swarm_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_swarm_logs_event_type ON public.swarm_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_swarm_logs_created_at ON public.swarm_logs(created_at DESC);

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.swarm_logs;

-- Trigger for updated_at
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();