import { getWebsite } from '@/utils/websites';
import SiteBuilderClient from './page-client';
import { use } from 'react';

async function getSite({ websiteId }) {
  const website = await getWebsite({ websiteId });
  return website;
}

export default function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteId } = params;

  // TODO: HANDLE BETTER
  if (!websiteId) throw new Error('Website UID not found');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = use(getSite({ websiteId }));


  // pass the website to the client component so I can set it on redux
  return <SiteBuilderClient website={website} />;
}
