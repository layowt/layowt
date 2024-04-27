import UserDropdownMenu from '@/components/modals/user-dropdown-menu';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';

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
      <EyeOpenIcon className="border border-black-50" />
      <Button variant="tertiary">Publish</Button>
      <UserDropdownMenu className="!size-10 text-sm" />
    </div>
  );
}
