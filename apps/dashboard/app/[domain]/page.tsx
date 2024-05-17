import { prisma } from '@/utils/prisma';
import { notFound } from 'next/navigation';

import { getDynamicSite } from '@/utils/websites';

//export async function generateStaticParams() {}

export default async function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  const websiteData = await getDynamicSite(domain);
  if (!websiteData) return notFound();

  return <div className="">hello from {websiteData.websiteName}</div>;
}
