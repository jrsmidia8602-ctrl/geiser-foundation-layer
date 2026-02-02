-- Drop and recreate the function using gen_random_uuid (always available in postgres)
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
  -- Use gen_random_uuid which is always available and replace hyphens
  key := 'XG_' || upper(replace(gen_random_uuid()::text, '-', ''));
  RETURN key;
END;
$$;