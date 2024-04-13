'use server';
// utils
import { getUserFromSession } from '@/utils/user/user-session';
import { getUserFromDb } from '@/utils/user/user.get';
import { createWebsite } from '@/utils/database/websites';
import { getWebsite } from '@/utils/websites/website.get';
import { getUserSubscription } from '@/utils/subscriptions/subscriptions.get';
import type { websites } from '@prisma/client';

// other
import { redirect } from 'next/navigation';
import uniqid from 'uniqid';

export default async function CreateNewSite() {
  // 1. check if the user has reached their limit of sites
  // 2. generate a new site id
  // 3. redirect to the 'site-builder/[siteUid]' page

  // get the userId from the current session
  const userSession = await getUserFromSession();

  // TODO: HANDLE THIS BETTER
  if (!userSession || !userSession?.data?.user?.id) {
    return;
  }

  // get the user from the db
  const user = await getUserFromDb(userSession?.data?.user?.id);

  // TODO: HANDLE THIS BETTER
  if (!user) throw new Error('User not found');

  //before we generate a new site, check if the user is eligible
  const userSubscription = await getUserSubscription(user.uid);

  // get the number of sites the use has
  const userSites = await getWebsite<websites[]>({ userId: user.uid }, true);

  // compare the number of sites the user has to the limit
  if (userSites.length >= userSubscription?.numOfWebsites) {
    return (
      <div className="text-white">
        <h1>You have reached your site limit</h1>
      </div>
    );
  }

  // generate a unique id for the new site
  const siteUid = uniqid();

  // // add this value to the db
  const newWebsite = await createWebsite(user.uid, siteUid);

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
