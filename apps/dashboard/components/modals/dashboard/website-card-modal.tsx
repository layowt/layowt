'use client';
import { websites as Website } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { DropdownMenuPortal } from '@radix-ui/react-dropdown-menu';

/**
 * This needs to allow the user to:
 *
 * - open in a new tab(?)
 * - delete the site
 * - preview the site
 * - go to the edit page
 * - favorite the site(?)
 */
export default function WebsiteCardModal({ website }: { website: Website }) {
  const dropdownItems = [
    {
      label: 'Open in new tab',
      onClick: () => {
        window.open(`/site/${website.websiteId}`, '_blank');
      }
    },
    {
      label: 'Delete',
      onClick: () => {
        console.log('Delete');
      }
    },
    {
      label: 'Preview',
      onClick: () => {
        console.log('Preview');
      }
    },
    {
      label: 'Edit',
      onClick: () => {
        console.log('Edit');
      }
    },
    {
      label: 'Favorite',
      onClick: () => {
        console.log('Favorite');
      }
    }
  ];

  return (
    <DropdownMenuPortal>
      <DropdownMenuContent
        className="bg-black border border-black-50 text-xs"
        sideOffset={5}
        side="bottom"
        align="end"
        onClick={(e) => e.preventDefault()}
      >
        {dropdownItems.map((item, index) => (
          <DropdownMenuGroup key={index}>
            <a
              href="#"
              className="block p-2 hover:bg-black-75"
              onClick={item.onClick}
            >
              {item.label}
            </a>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenuPortal>
  );
}
