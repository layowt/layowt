import { getUserFromSession } from '@/actions/user/get-user';
import { getWebsite } from '@/actions/websites/get-website';
import type { websites } from '@prisma/client';

import NavigationItems from '@/components/layout/dashboard/navigation/items';
import SiteLogo from '@/components/logo';

export default async function DashboardSidebar() {
  const userId = await (await getUserFromSession())?.data?.user?.id;

  if (!userId) return;

  const websites = await getWebsite<websites[]>({ userId }, true);

  return (
    <section
      className="min-w-48 min-h-screen flex flex-col text-white font-poppins bg-black-300"
    >
      <div className="border-b border-black-50 relative -top-px">
        <SiteLogo className="py-4 px-4" />
      </div>
      <NavigationItems
        websites={websites}
        className="px-2 h-full border-r border-black-50 pt-6 pb-3"
      />
    </section>
  );
}
