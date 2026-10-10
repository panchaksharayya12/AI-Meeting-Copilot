/**
 * Supabase service module.
 * Provides client initialization if credentials exist,
 * and graceful fallback if absent.
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== '' &&
    !supabaseUrl.includes('placeholder')
  );
};

export const getSupabaseConfig = () => {
  return {
    configured: isSupabaseConfigured(),
    url: isSupabaseConfigured() ? supabaseUrl : null
  };
};
