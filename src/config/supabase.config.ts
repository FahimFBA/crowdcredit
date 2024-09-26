import { SUPABASE_ANON_KEY, SUPABASE_BASE_URL } from "@/_Variables";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_BASE_URL, SUPABASE_ANON_KEY);
