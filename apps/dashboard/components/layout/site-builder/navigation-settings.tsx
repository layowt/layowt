import UserDropdownMenu from '@/components/modals/user-dropdown-menu';
import LoadingSpinner from '@/components/saving';
import { Button } from '@/components/ui/button';
import SiteBuilderPublishModal from './navigation-publish-dropdown';

import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';
import { publishSite } from '@/utils/websites';

export default function SiteBuilderSettings() {
  const websiteObj = useAppSelector(website);

  return (
    <div className="flex items-center gap-x-4">
      <LoadingSpinner />
      <div className="flex group">
        <Button
          variant="secondary"
          className="!rounded-br-none !rounded-tr-none group-hover:!bg-white group-hover:text-black text-xs"
          rounded="sm"
          size="sm"
          hoverEffect={false}
          onClick={() => publishSite(websiteObj.websiteId)}
        >
          Publish
        </Button>
        <div className="w-px h-full bg-black-50"></div>
        <SiteBuilderPublishModal website={websiteObj} />
      </div>
      <UserDropdownMenu
        className="!size-8 text-sm"
        siteLogo={websiteObj?.websiteLogo}
      />
    </div>
  );
}
