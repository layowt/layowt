'use server'
import { prisma } from '@/utils/prisma';
import { unstable_cache } from 'next/cache';

export const getAllComponents = unstable_cache(
  async () => {
    try{
      return await prisma.component.findMany();
    }
    catch(e){
      console.error(e)
    }
  }
)