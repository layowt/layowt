'use server';
import WebsiteCard from '@/components/layout/dashboard/website-card';
import { getUserFromSession } from '@/utils/user/user-session';
import { getUserFromDb } from '@/utils/user/user.get';
import { getWebsite } from '@/utils/websites';
import { websites } from '@prisma/client';
import PageClient from './page-client';

export default async function Dashboard() {
  const userId = await (await getUserFromSession())?.data?.user?.id;

  if (!userId) return;

  const websites = await getWebsite<websites[]>({ userId }, true);

  const user = await getUserFromDb(userId);
  return (
    <PageClient>
      <div className="text-2xl flex flex-col gap-y-10 font-semibold font-inter text-white">
        <div className="flex flex-col gap-2">Overview</div>
        <div className="gap-10 w-1/2 grid grid-cols-2">
          {websites.map((website, index) => (
            <WebsiteCard
              key={website.websiteId}
              {...website}
            />
          ))}
        </div>
      </div>
    </PageClient>
  );
}
