import type { Metadata } from 'next';

import { getWebsite } from '@/utils/websites/website.get';

const apiEndpoint = process.env.DRAGGLE_API_URL;

export const metadata: Metadata = {
  title: 'Draggle | Site Builder',
  description: 'Where digital products come to life.'
};

export default async function Page({ params }: { params: { uid: string } }) {
  // get the uid from the params
  const { uid: websiteUid } = params;

  // TODO: HANDLE BETTER
  if (!websiteUid) throw new Error('Website UID not found');

  // once we have the websiteUid, we can fetch all of its data from the db
  const website = await getWebsite({ websiteId: websiteUid });

  // we now need to hit our external api to get the site data
  // const response = await fetch(`${apiEndpoint}/ping/${websiteUid}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  //let responseData = await response.json();

  return <div className="text-white"></div>;
}
