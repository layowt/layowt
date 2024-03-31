'use client';
import NavigationItems from '@/components/layout/navigation-items';
import SiteLogo from '@/components/logo';

export default function DashboardSidebar() {
  return (
    <section
      className="
					min-w-40 min-h-screen px-2 flex flex-col gap-y-10 text-white font-poppins border-r border-black-50
				"
    >
      <SiteLogo />
      <NavigationItems />
    </section>
  );
}
