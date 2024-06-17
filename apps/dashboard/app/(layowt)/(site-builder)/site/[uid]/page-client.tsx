'use client';
import type { Components, websites as Website } from '@prisma/client';
import { setWebsite } from '@/actions/websites/set-website'
import dynamic from 'next/dynamic';
import SiteBuilderCanvas from '@/components/website/builder/canvas';
import { redirect } from 'next/navigation';
import { useAppDispatch } from '@/utils/index';
import { setComponents } from '@/store/slices/canvas';

interface SiteBuilderClientProps {
  website: Website;
  components: Components[];
}

export default function SiteBuilderClient({
  website,
  components
}: SiteBuilderClientProps) {
  const dispatch = useAppDispatch();

  // set the components in redux
  dispatch(setComponents(components));

  // prevent ssr for this component
  const NoSSR = dynamic(
    () => import('@/components/modals/site/user-site-data'),
    { ssr: false }
  );
  // set the user in redux using this hook
  //useUser();
  setWebsite(website);

  if (!website?.websiteId) {
    redirect('/dashboard');
  }

  // if we do not have a site name, try to fetch the site from the db
  if (website?.websiteName === 'Untitled') {
    return <NoSSR />;
  } else {
    // otherwise we're all good - set the website in redux so we can use on all
    // components within this route
    setWebsite(website);
  }

  // entry point for the site builder page
  return <SiteBuilderCanvas />;
}
