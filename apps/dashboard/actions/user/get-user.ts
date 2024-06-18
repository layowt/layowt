'use server';
//prisma
import { prisma } from '@/utils/prisma';

// types
import type { users as user } from '@prisma/client';
import { UserResponse } from '@supabase/supabase-js';

// supabase
import { createClient as createClientClient } from '@/utils/supabase/client'
import { createClient as createServerClient } from "@/utils/supabase/server";

import { unstable_cache } from 'next/cache';


/**
 * 
 * Get a user from the database via a given id
 * 
 * @param id 
 * @returns user
 */
export const getUserFromDb = unstable_cache(
  async(id) => {
    const user = await prisma.users.findFirst({
      where: {
        uid: {
          equals: id
        }
      }
    });
    if(!user) console.error('No user found with that id')

    return user
  }
)

/**
 * Returns the user from the client
 * 
 * @returns UserResponse
 */
export const getClientUser = async(): Promise<UserResponse> => {
	const supabase = createClientClient();

	return await supabase.auth.getUser()
}

/**
 * Get the user from the server - used in api routes, server componets & server actions
 * 
 * @returns 
 */
export const getUserFromSession = unstable_cache(
  async() => {
    const supabase = createServerClient();
    return supabase?.auth?.getUser();
  }
)