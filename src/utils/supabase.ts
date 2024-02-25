'use server';
import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const user = await supabase.auth.signUp({
      email,
      password
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};
