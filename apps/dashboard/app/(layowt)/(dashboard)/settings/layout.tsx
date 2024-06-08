import { Suspense } from 'react';
import Loading from '../../loading';

import DashboardNavBar from '@/components/layout/dashboard/navigation-navbar';
import DashboardSidebar from '@/components/layout/dashboard/navigation/navigation-sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="flex text-white">
        <DashboardSidebar />
        <DashboardNavBar>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </DashboardNavBar>
      </div>
    </div>
  );
}
