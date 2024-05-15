// components
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ModalDeleteSite from '@/components/modals/site/modal-delete-site';
import { motion } from 'framer-motion';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

// utils
import type { websites as Website } from '@prisma/client';
import { getLastUpdatedUser, publishSite, updateWebsite } from '@/utils/websites';
import { getTimeStamp } from '@/utils/index';

export default function PublishDropdownItems({
  website
}: {
  website: Website;
}) {
  const handleWebsitePublish = async () => {
    if (website.hasBeenPublished) {
      updateWebsite(website.websiteId, {
        ...website
      });
      toast.success('Website updated successfully');
    } else {
      publishSite(website.websiteId);
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
          <div className="">By Unknown</div>
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
          <motion.li
            key={option.name}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="list-none w-full"
          >
            {option.html}
          </motion.li>
        )
      )}
    </>
  );
}
