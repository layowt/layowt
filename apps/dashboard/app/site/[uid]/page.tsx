import { getWebsite } from '@/utils/websites';
import SiteBuilderClient from './page-client';

export default async function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteId } = params;

  // TODO: HANDLE BETTER
  if (!websiteId) throw new Error('Website UID not found');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = await getWebsite({ websiteId: websiteId });

  // we now need to hit our external api to get the site data
  // const response = await fetch(`${apiEndpoint}/ping/${websiteUid}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  //let responseData = await response.json();

  // pass the website to the client component so I can set it on redux
  return <SiteBuilderClient website={website} />;
}
