import { getWebsite } from '@/utils/websites';
import SiteBuilderClient from './page-client';
import { use } from 'react';
import { Metadata } from 'next';
import { generateSiteMetadata } from '@/utils/websites/metadata';
import { redirect } from 'next/navigation';

async function getSite({ websiteId }) {
  return await getWebsite({ websiteId });
}

export async function generateMetadata({
  params
}: {
  params: {
    uid: string
  }
}): Promise<Metadata>{
  const { uid } = params;
  const website = await getSite({ websiteId: uid });

  return generateSiteMetadata(website, {
    title: `${website?.websiteName} - Layowt Site Builder`
  });
}

export default function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteId } = params;

  // TODO: HANDLE BETTER
  if (!websiteId) redirect('/dashboard?error=no-website-id');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = use(getSite({ websiteId }));
  // if the website doesn't exist, redirect to the dashboard
  if (!website) redirect('/dashboard?e=website-not-found');

  // pass the website to the client component so I can set it on redux
  return <SiteBuilderClient website={website} />;
}
