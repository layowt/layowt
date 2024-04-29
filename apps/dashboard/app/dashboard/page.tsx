import WebsiteCard from '@/components/layout/dashboard/website-card';
import { getUserFromSession } from '@/utils/user/user-session';
import { getUserFromDb } from '@/utils/user/user.get';
import { getWebsite } from '@/utils/websites/website.get';
import { websites } from '@prisma/client';

export default async function Dashboard() {
  const userId = await (await getUserFromSession()).data.user.id;
  if (!userId) throw new Error('No user id found');
  const user = await getUserFromDb(userId);

  const websites = await getWebsite<websites[]>({ userId: user.uid }, true);
  return (
    <>
      <div className="text-2xl flex flex-col gap-y-10 font-semibold font-inter text-white">
        <div className="flex flex-col gap-y-2">
          Welcome back {user?.firstName || user?.email}!
          <span className="font-poppins text-xs font-light">
            Here&apos;s what&apos;s happened whilst you were away
          </span>
        </div>
        <div className="gap-10 w-1/2 grid grid-cols-2">
          {websites.map((website) => (
            <WebsiteCard
              key={website.websiteId}
              {...website}
            />
          ))}
        </div>
      </div>
    </>
  );
}
