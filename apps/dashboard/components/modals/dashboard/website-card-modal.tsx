'use client';
import { websites as Website } from '@prisma/client';
import { DropdownMenuContent, DropdownMenuGroup } from '@/ui/dropdown-menu';
import { DropdownMenuPortal } from '@radix-ui/react-dropdown-menu';
import { deleteWebsite } from '@/actions/websites/delete';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAppDispatch } from '@/utils/index';
import { removeWebsite } from '@/store/slices/website-store';

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
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    isDeleting: false
  });

  const handleSiteDelete = async () => {
    setState({ ...state, isDeleting: true });
    try {
      await deleteWebsite(website.websiteId);

      // update the local copy of the sites
      dispatch(removeWebsite(website));

      toast.success('Website deleted successfully');
    } catch (e) {
      toast.error(
        'An error occurred while deleting the website. Please try again or contact support.'
      );
    }

    setState({ ...state, isDeleting: false });
  };

  const dropdownItems = [
    {
      label: 'Open in new tab',
      onClick: () => {
        window.open(`/site/${website.websiteId}`, '_blank');
      },
      isButton: true
    },
    {
      label: 'Preview',
      onClick: () => {
        console.log('Preview');
      },
      isButton: true
    },
    {
      label: 'Edit',
      onClick: () => {
        console.log('Edit');
      },
      isButton: true
    },
    {
      label: 'Favourite',
      onClick: () => {
        console.log('Favorite');
      },
      isButton: true
    },
    {
      label: 'Delete',
      onClick: async () => {
        await handleSiteDelete();
      },
      isButton: true
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
            {item.isButton ? (
              <button
                className="block p-2 hover:bg-black-75 w-full text-start"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <a
                target="_blank"
                className="block p-2 hover:bg-black-75 w-full text-start"
              >
                {item.label}
              </a>
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenuPortal>
  );
}
