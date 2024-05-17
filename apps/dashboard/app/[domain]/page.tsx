import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

import { getDynamicSite } from '@/utils/websites';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: ''
  }
}

export default async function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  const websiteData = await getDynamicSite(domain);
  if (!websiteData) return notFound();

  return <div className="">hello from {websiteData.websiteName}</div>;
}
