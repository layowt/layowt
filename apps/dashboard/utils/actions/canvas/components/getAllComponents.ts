'use server'
import { prisma } from '@/utils/prisma';
import { unstable_cache as cache } from 'next/cache';

export const getAllComponents = cache(
  async () => {
    try{
      return await prisma.components.findMany();
    }
    catch(e){
      console.error(e)
    }
  }
)