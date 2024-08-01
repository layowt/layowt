'use server';
import { prisma } from '@/utils/prisma';
import { User } from '@prisma/client';

type UpdateUser = {
  uid: User['uid'],
  data: Partial<User>
}

/**
 * Method to update a user's details in the database
 * 
 * @param id 
 * @param data 
 * @returns 
 */
export const updateUser = async ({ uid, data }: UpdateUser) => { 
  if (!uid) throw new Error('No id provided');
  
  // update the user details
  const res = await prisma.user.update({
    where: {
      uid
    },
    data
  })
  if (!res) throw new Error('No user found');

  return {
    success: true,
    data: res
  };
}