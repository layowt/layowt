import SiteLogo from '@/components/logo';
import ScreenSizeSwapper from '@/components/layout/site-builder/screensize-swapper';

export default function SiteBuilderNavBar() {
  return (
    <div className="p-4 border-b border-black-50">
      <div className="flex items-center justify-between">
        <SiteLogo className="text-white" />

        <ScreenSizeSwapper />

        <div className="bg-white w-10 h-8"></div>
      </div>
    </div>
  );
}
