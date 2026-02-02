-- Add new agent roles for OMEGA-SWARM
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'publisher';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'observer';
ALTER TYPE agent_role ADD VALUE IF NOT EXISTS 'sentinel';

-- Add new agent states
ALTER TYPE agent_status ADD VALUE IF NOT EXISTS 'thinking';
ALTER TYPE agent_status ADD VALUE IF NOT EXISTS 'learning';
ALTER TYPE agent_status ADD VALUE IF NOT EXISTS 'replicating';