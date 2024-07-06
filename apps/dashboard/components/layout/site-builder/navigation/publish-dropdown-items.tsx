// components
import { Dialog, DialogTrigger } from '~/packages/components/ui/dialog';
import { Button } from '~/packages/components/ui/button';
import { toast } from 'sonner';
import ModalDeleteSite from '@/components/modals/site/modal-delete-site';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

// utils
import type { Website } from '@prisma/client';
import { updateWebsite } from '@/actions/websites/update';
import { publishSite } from '@/actions/websites/publish-website';
import { getTimeStamp } from '@/utils/index';
import { User } from '@supabase/supabase-js';
import { useUser } from '@/hooks/useUser';

export default function PublishDropdownItems({
  website,
  lastUpdatedUser
}: {
  website: Website;
  lastUpdatedUser: User
}) {
  const user = useUser()

  const handleWebsitePublish = async () => {
    if (website.hasBeenPublished) {
      updateWebsite(website.websiteId, {
        ...website,
        lastUpdatedUid: user?.id
      });
      toast.success('Website updated successfully');
    } else {
      publishSite(website.websiteId, {
        lastUpdatedUid: user?.id
      });
      toast.success('Website published successfully');
    }
  };

  const dropdownOptions = [
    {
      name: 'lastUpdated',
      html: (
        <div className="flex flex-col gap-y-1 text-xs p-2">
          <span className="flex items-center gap-x-1">
            Last updated
            <p className="bg-black-50 p-1 rounded">
              {getTimeStamp(website?.lastUpdated)}
            </p>
          </span>
          <div>
            By {lastUpdatedUser?.email}
          </div>
        </div>
      )
    },
    {
      name: 'separator'
    },
    {
      name: 'publish-unpublish',
      html: (
        <div className="flex flex-col w-full gap-2 items-center font-inter mt-2 [&>div]:w-full">
          <Dialog modal={true}>
            <DialogTrigger
              className="w-full"
              asChild
            >
              <Button
                variant="destructive"
                className="p-2 group-hover:!bg-white group-hover:text-black text-xs !border-none font-inter"
                rounded="sm"
              >
                <span className="w-full">Delete</span>
              </Button>
            </DialogTrigger>

            {/* <ModalDeleteSite siteId={website?.websiteId} /> */}
          </Dialog>
          <Button
            variant="secondary"
            className="p-2 group-hover:!bg-white group-hover:text-black text-xs !border-none"
            rounded="sm"
            onClick={async () => await handleWebsitePublish()}
          >
            <span>{website?.hasBeenPublished ? 'Update' : 'Publish'}</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      {dropdownOptions.map((option, index) =>
        option.name === 'separator' ? (
          <DropdownMenuSeparator
            key={index}
            className="!bg-black-50"
          />
        ) : (
          <li
            key={option.name}
            className="list-none w-full"
          >
            {option.html}
          </li>
        )
      )}
    </>
  );
}
