import getUserFromSession from '@/utils/user/getUserFromSession';
import { prisma } from '@/utils/prisma';

export default async function CreateNewSite() {
  // 1. check if the user has reached their limit of sites
  // 2. generate a new site id
  // 3. redirect to the 'site-builder/[siteUid]' page

  // get the userId from the current session
  const userSession = await getUserFromSession();

  // TODO: HANDLE THIS BETTER
  if (!userSession || !userSession.data.user.id) {
    return;
  }
  // get the user from the db
  const user = await prisma.users.findFirst({
    where: {
      uid: userSession.data.user.id
    }
  });

  // TODO: HANDLE THIS BETTER
  if (!user) {
    throw new Error('User not found');
  }

  return (
    <div className="text-white">
      <h1>{userSession.data.user.id}</h1>
      <h3>{user.email}</h3>
    </div>
  );
}
