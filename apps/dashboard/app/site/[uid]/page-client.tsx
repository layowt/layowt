'use client';
import type { websites as Website } from '@prisma/client';
import { setWebsite } from '@/utils/websites/setWebsite';
import dynamic from 'next/dynamic';
import { useUser } from '@/hooks/useUser';

export default function SiteBuilderClient({ website }: { website: Website }) {
  // prevent ssr for this component
  const NoSSR = dynamic(
    () => import('@/components/modals/site/user-site-data'),
    { ssr: false }
  );
  // set the user in redux using this hook
  useUser();

  // we have access to the dynamic uid in this component as we have passed it down from the
  // 'server' page - we can now set the website here so it can be used globally
  setWebsite(website);

  if (!website.websiteName.length) {
    return <NoSSR />;
  }

  return '';
}
