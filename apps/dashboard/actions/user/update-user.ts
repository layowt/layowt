'use server';
import { prisma } from '@/utils/prisma';
import { User } from '@supabase/supabase-js';

type UpdateUser = {
  id: User['id'],
  data: Partial<User>
}

/**
 * Method to update a user's details in the database
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export const updateUser = async ({ id, data }: UpdateUser) => { 
  if (!id) throw new Error('No id provided');
  
  // update the user details
  const res = await prisma.user.update({
    where: {
      uid: id
    },
    data
  })
  if (!res) throw new Error('No user found');

  return true;
}