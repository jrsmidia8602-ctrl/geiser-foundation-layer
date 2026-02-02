-- Enable pgcrypto extension for secure key generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop and recreate the function with proper extension
DROP FUNCTION IF EXISTS public.generate_license_key();

CREATE OR REPLACE FUNCTION public.generate_license_key()
RETURNS text
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