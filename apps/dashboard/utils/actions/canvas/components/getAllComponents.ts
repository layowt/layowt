'use server'
import { prisma } from '@/utils/prisma';
import { unstable_cache as cache } from 'next/cache';

export const getAllComponents = cache(
  async () => {
    try{
      const components = await prisma.components.findMany();
      return components;
    }
    catch(e){
      console.error(e)
    }
  }
)