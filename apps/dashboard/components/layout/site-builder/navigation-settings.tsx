import UserDropdownMenu from '@/components/modals/user-dropdown-menu';
import LoadingSpinner from '@/components/saving';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon, ChevronDownIcon } from '@radix-ui/react-icons';

/**
 *
 * @returns What does this need?
 * - profile dropdown ✅
 * - ability to share
 * - preview page
 * - publish ✅
 */
export default function SiteBuilderSettings() {
  return (
    <div className="flex items-center gap-x-4">
      <LoadingSpinner />
      {/* <EyeOpenIcon /> */}
      <div className="flex group">
        <Button
          variant="tertiary"
          className="!rounded-br-none !rounded-tr-none group-hover:!bg-white group-hover:text-black"
          rounded="sm"
          size="sm"
          hoverEffect={false}
        >
          Publish
        </Button>
        <div className="w-px h-full bg-black-50"></div>
        <Button
          variant="tertiary"
          className="!rounded-bl-none !rounded-tl-none group-hover:!bg-white group-hover:text-black"
          rounded="sm"
          size="sm"
          hoverEffect={false}
        >
          <ChevronDownIcon />
        </Button>
      </div>
      <UserDropdownMenu className="!size-10 text-sm" />
    </div>
  );
}
