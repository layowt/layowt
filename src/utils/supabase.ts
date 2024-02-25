import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const user = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email?email=${email}`
      }
    });
    //router.refresh();
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};
