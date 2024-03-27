/**
 * Client Component client -
 * To access Supabase from Client Components,
 * which run in the browser.
 */
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
