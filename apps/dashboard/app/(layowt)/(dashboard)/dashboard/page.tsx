'use server';
import WebsiteCard from '@/components/layout/dashboard/website-card';
import { getUserFromSession } from '@/utils/user';
import { getUserFromDb } from '@/utils/user';
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
      <div className="flex flex-col gap-y-10 text-white">
        <div className="flex flex-col text-heading-3xl">Overview</div>
        <div className="gap-10 w-1/2 grid col-span-1 lg:grid-cols-2">
          {/* {websites.map((website, index) => (
            <WebsiteCard
              key={website.websiteId}
              {...website}
            />
          ))} */}
        </div>
      </div>
    </PageClient>
  );
}
