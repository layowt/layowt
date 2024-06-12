import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

import { getDynamicSite } from '@/utils/websites';
import { Metadata } from 'next';
import { use } from 'react';
import { generateSiteMetadata } from '@/utils/websites/metadata';

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

  return generateSiteMetadata(website);
}

/**
 *  Generate a list of the websites
 * 
 * This allows us to statically generate the route at build
 * time and not on demand at request time.
 * 
 */
export async function generateStaticParams(){
  const websites = await prisma.websites.findMany();

  return websites.map((website) => ({
    params: { domain: website.websiteUrl }
  }));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number]['params'];

export default function Page({ 
  params 
}: { 
  params: StaticParams
}) {
  const { domain } = params;

  const websiteData = use(getCurrentSite(decodeURIComponent(domain)));

  if (!websiteData) return notFound();
  return (
    <main 
      style={{
        backgroundColor: websiteData?.websiteBackgroundColor
      }}
      data-layowt-id={websiteData?.websiteId}
    >
      <div>hello from {websiteData.websiteName}</div>
    </main>
  )
}
