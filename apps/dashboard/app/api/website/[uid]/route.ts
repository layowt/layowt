import { prisma } from '@/utils/prisma'
import { getWebsiteByDomain } from '@/utils/websites'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { 
  params 
}: { 
  params: { 
    slug: string 
  } 
}) {
  const { websiteId } = await getWebsiteByDomain(params.slug)

  return NextResponse.json(websiteId)
}