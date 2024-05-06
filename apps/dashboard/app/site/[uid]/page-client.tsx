'use client';
import type { websites as Website } from '@prisma/client';
import { setWebsite } from '@/utils/websites/setWebsite';
import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/useUser';
import { getWebsite } from '@/utils/websites/website.get';

export default async function SiteBuilderClient({
  website
}: {
  website: Website;
}) {
  // prevent ssr for this component
  const NoSSR = dynamic(
    () => import('@/components/modals/site/user-site-data'),
    { ssr: false }
  );
  // set the user in redux using this hook
  useUser();
  setWebsite(website);

  // if we do not have a site name, try to fetch the site from the db
  if (website.websiteName === 'Untitled') {
    const site = await getWebsite<Website>({ websiteId: website.websiteId });

    // if we do not have the data that we need - we need to render the user-site-data component
    if (!site || site.websiteName === 'Untitled') {
      return <NoSSR />;
    } else {
      // otherwise we're all good - set the website in redux so we can use on all
      // components within this route
      setWebsite(site);
    }
  }

  // entry point for the site builder page
  return '';
}
