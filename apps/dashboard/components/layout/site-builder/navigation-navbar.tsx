//import SiteLogo from '@/components/logo';

import ScreenSizeSwapper from '@/components/layout/site-builder/screensize-swapper';
import SiteBuilderSettings from '@/components/layout/site-builder/navigation-settings';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function SiteBuilderNavBar() {
  return (
    <div className="p-4 border-b border-black-50 flex items-center justify-between">
      {/* <SiteLogo className="text-white" /> */}
      <div className="flex items-center gap-x-4 divide-x divide-white">
        <Link href="/dashboard">
          <ArrowLeftIcon />
        </Link>
        {/** Set / view site name */}
      </div>

      <ScreenSizeSwapper />

      <SiteBuilderSettings />
    </div>
  );
}
