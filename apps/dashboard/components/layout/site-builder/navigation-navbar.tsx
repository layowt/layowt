//import SiteLogo from '@/components/logo';

// components
import ScreenSizeSwapper from '@/components/layout/site-builder/screensize-swapper';
import SiteBuilderSettings from '@/components/layout/site-builder/navigation-settings';
import WebsiteNameInput from '@/components/website/name-input';

// misc
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function SiteBuilderNavBar() {
  return (
    <div className="p-4 border-b border-black-50 flex items-center justify-between">
      {/* <SiteLogo className="text-white" /> */}
      <div className="flex items-center gap-x-4">
        <Link href="/dashboard">
          <ArrowLeftIcon />
        </Link>
        {/** Set / view site name */}
        <WebsiteNameInput />
      </div>

      <ScreenSizeSwapper />

      <SiteBuilderSettings />
    </div>
  );
}
