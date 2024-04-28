import { getWebsite } from '@/utils/websites/website.get';
import SiteBuilderClient from './page-client';

const apiEndpoint = process.env.DRAGGLE_API_URL;

export default async function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteId } = params;

  // TODO: HANDLE BETTER
  if (!websiteId) throw new Error('Website UID not found');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = await getWebsite({ websiteId: websiteId });

  console.log(website);

  // we now need to hit our external api to get the site data
  // const response = await fetch(`${apiEndpoint}/ping/${websiteUid}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  //let responseData = await response.json();

  return <SiteBuilderClient website={website} />;
}
