/**
 * Server Component client -
 * 	To access Supabase from Server Components, Server Actions,
 *  and Route Handlers, which run only on the server.
 *
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    'https://bixpqirmnvxjgpfjhzrk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeHBxaXJtbnZ4amdwZmpoenJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzU4ODgsImV4cCI6MjAyMjQ1MTg4OH0.OSavv0-02TFPk4pBZx9yK0AXtbQyuibkvmqaGYD-tSo',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  );
}
