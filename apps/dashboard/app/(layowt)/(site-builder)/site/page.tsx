// utils
import { getUserFromSession } from '@/utils/user';
import { getUserFromDb } from '@/utils/user';
import { createWebsite } from '@/utils/websites';
import { getWebsite } from '@/utils/websites';
import { getUserSubscription } from '@/utils/subscriptions/subscriptions.get';
import type { websites } from '@prisma/client';
import dynamic from 'next/dynamic';

// other
import { redirect } from 'next/navigation';
import uniqid from 'uniqid';

function ModalErrorTitle(){
  return (
    <h1 className="text-white text-2xl font-bold font-satoshi">You have reached your limit of sites</h1>
  );
}

export default async function CreateNewSite() {
  // 1. check if the user has reached their limit of sites
  // 2. generate a new site id
  // 3. redirect to the 'site-builder/[siteUid]' page

  const NoSSR = dynamic(
    () => import('@/components/modals/site/modal-create-site-error'),
    { ssr: false }
  );

  // get the userId from the current session
  const userSession = await getUserFromSession();

  // TODO: HANDLE THIS BETTER
  if (!userSession || !userSession?.data?.user?.id) {
    redirect('/login?error=no-user-session')
  }

  let user;
  try {
    // get the user from the db
    user = await getUserFromDb(userSession.data.user.id);
  } catch (e) {
    console.log(e);
  }
  //before we generate a new site, check if the user is eligible
  const userSubscription = await getUserSubscription(userSession.data.user.id);

  // get the number of sites the use has
  const userSites = await getWebsite<websites[]>(
    { userId: userSession.data.user.id },
    true
  );
  // compare the number of sites the user has to the limit
  //if (userSites.length >= userSubscription?.numOfWebsites) {
    return (
      <NoSSR title={<ModalErrorTitle />} />
    );
  //}

  // generate a unique id for the new site
  const siteUid = uniqid();

  // // add this value to the db
  const newWebsite = await createWebsite(userSession.data.user.id, siteUid);

  // TODO: REDIRECT WITH AN APPROPRIATE MESSAGE
  // either -
  // 1. prompt user to upgrade their subscription
  // 2. redirect to the dashboard page
  if (!newWebsite) {
    return (
      <div className="text-white">
        <h1>Failed to create new site</h1>
      </div>
    );
  }

  // if we have a value, redirect the user to the /site
  // page with the new site id
  redirect(`/site/${siteUid}`);
}
