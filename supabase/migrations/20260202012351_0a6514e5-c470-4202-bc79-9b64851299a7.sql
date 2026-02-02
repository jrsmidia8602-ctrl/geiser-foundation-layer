-- Add trust_score column to agents
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS trust_score NUMERIC DEFAULT 1.0;