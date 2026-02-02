-- Add replicator role to agent_role enum
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'replicator';

-- Add replication tracking to agents table
ALTER TABLE agents ADD COLUMN IF NOT EXISTS replicated_from UUID REFERENCES agents(id);
ALTER TABLE agents ADD COLUMN IF NOT EXISTS replication_count INTEGER DEFAULT 0;

-- Create agent_publications table for tracking published outputs
CREATE TABLE IF NOT EXISTS public.agent_publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agent_publications ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Public read access to agent_publications" ON public.agent_publications
  FOR SELECT USING (true);

CREATE POLICY "Service role full access to agent_publications" ON public.agent_publications
  FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_agent_publications_agent_id ON agent_publications(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_publications_channel ON agent_publications(channel);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_publications;