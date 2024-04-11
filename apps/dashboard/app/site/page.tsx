'use server';
import getUserFromSession from '@/utils/user/getUserFromSession';
import uniqid from 'uniqid';
import { getUserFromDb } from '@/utils/user/user.get';
import { createWebsite } from '@/utils/database/websites';
import { redirect } from 'next/navigation';

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
  if (!user) {
    throw new Error('User not found');
  }

  // generate a unique id for the new site
  const siteUid = uniqid();

  // // add this value to the db
  const newWebsite = await createWebsite(user.uid, siteUid);

  // TODO: REDIRECT WITH AN APPROPRIATE MESSAGE
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

  return (
    <div className="text-white">
      <h1>{user.email}</h1>
      <h1>{siteUid}</h1>
    </div>
  );
}