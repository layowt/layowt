import type { Metadata } from 'next';

// components
import ScreenSizeSwapper from '@/components/layout/site-builder/screensize-swapper';
import SiteBuilderSettings from '@/components/layout/site-builder/navigation-settings';
import WebsiteNameInput from '@/components/website/name-input';

// misc
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Site Builder | Layowt',
  description: 'Where digital products come to life.'
};

export default function SiteBuilderNavBar() {
  return (
    <nav className="p-4 border-b border-black-75 flex items-center justify-between">
      {/* <SiteLogo className="text-white" /> */}
      <div className="flex items-center gap-x-4 w-1/3">
        <Link href="/dashboard">
          <ArrowLeftIcon />
        </Link>
        <div className="bg-black-75 w-px h-5"></div>
        {/** Set / view site name */}
        <WebsiteNameInput />
      </div>
      <div className="w-1/3 flex justify-center">
        <ScreenSizeSwapper />
      </div>
      <div className="w-1/3 flex justify-end">
        <SiteBuilderSettings />
      </div>
    </nav>
  );
}
