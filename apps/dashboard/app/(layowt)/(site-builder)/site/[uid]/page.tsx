import { getWebsite } from '@/actions/websites/get-website';
import SiteBuilderClient from './page.client';
import { Metadata } from 'next';
import { generateSiteMetadata } from '@/actions/websites/metadata';
import { redirect } from 'next/navigation';
import { getAllComponents } from '@/actions/canvas/components/get-all-components';

async function getSite({ websiteId }) {
  return await getWebsite({ websiteId });
}

async function getComponents() {
  return await getAllComponents();
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

export default async function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteId } = params;

  if (!websiteId) redirect('/dashboard?error=no-website-id');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = await getSite({ websiteId });
  // if the website doesn't exist, redirect to the dashboard
  if (!website) redirect('/dashboard?e=website-not-found');

  // get all the components from the db
  const components = await getComponents();

  // pass the website to the client component so I can set it on redux
  return <SiteBuilderClient website={website} components={components} />;
}
