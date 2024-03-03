'use server';
import { supabase } from '@/lib/supabase';
import { type AuthResponse } from '@supabase/supabase-js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse['data']['user'] | null> => {
  try {
    const { data } = await supabase.auth.signUp({
      email,
      password
    });

    // easy access to the user object
    const user = data.user;

    // throw an error if required fields cannot be found
    if (!user || !user.id || !user.email) throw new Error('User not found');

    // if the user sign up is successful, add the user to the database
    const databaseUser = prisma.user.create({
      data: {
        uid: user?.id,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: '',
        lastName: '',
        hasAuthenticatedEmail: false
      }
    });

    supabase.from('users').insert(databaseUser);

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    return null;
  }
};
