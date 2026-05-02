import { createClient } from "@supabase/supabase-js";

const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "hbbtegiecallsiajrunj";
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || `https://${supabaseProjectId}.supabase.co`;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiYnRlZ2llY2FsbHNpYWpydW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTEzOTAsImV4cCI6MjA2NzIyNzM5MH0.COj1AuZKSAtTjyghMYoPWfzvF2074tI6iAt2Usnj6JM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export { supabaseAnonKey, supabaseProjectId, supabaseUrl };
