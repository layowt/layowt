import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

import { getDynamicSite } from '@/utils/websites';
import { Metadata } from 'next';
import { use } from 'react';

async function getCurrentSite(domain: string) {
  return await getDynamicSite(domain);
}

export async function generateMetadata({
  params
}: {
  params: {
    domain: string
  }  
}): Promise<Metadata> {
  const domain = decodeURIComponent(params.domain);
  const website = await getCurrentSite(domain);

  return {
    title: website?.websiteName || 'Website'
  }
}

export default function Page({ 
  params 
}: { 
  params: { 
    domain: string 
  } 
}) {
  const domain = decodeURIComponent(params.domain);

  const websiteData = use(getCurrentSite(domain));
  if (!websiteData) return notFound();

  return <div>hello from {websiteData.websiteName}</div>;
}
