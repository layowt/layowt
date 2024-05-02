'use client';
import type { websites as Website } from '@prisma/client';
import { setWebsite } from '@/utils/websites/setWebsite';
import UserSiteData from '@/components/modals/site/user-site-data';

export default function SiteBuilderClient({ website }: { website: Website }) {
  // we have access to the dynamic uid in this component as we have passed it down from the
  // 'server' page - we can now set the website here so it can be used globally
  setWebsite(website);

  if (!website.websiteName) {
    <UserSiteData />;
  }

  return '';
}
