import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  ArrowRightIcon,
  Pencil1Icon
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import type { websites as Website } from '@prisma/client';
import Link from 'next/link';
import { cn, getEnv } from '@/utils/index';
import PublishDropdownItems from './navigation-publish-dropdown-items';
import { useEffect, useState } from 'react';
import { updateWebsite } from '@/utils/websites';

export default function SiteBuilderPublishModal({
  website
}: {
  website: Website;
}) {
  const [websiteUrlEditor, setWebsiteUrlEditor] = useState(false);
  const [websiteUrlEditable, setWebsiteUrlEditable] = useState(
    website?.websiteUrl?.split('.')[0]
  );

  // use effect to update the website url in the backend
  useEffect(() => {
    // update the website url in the backend
    updateWebsite(website?.websiteId, {
      websiteUrl: websiteUrlEditable
    });
  }, [websiteUrlEditor]);

  const env = getEnv() === 'production' ? 'https' : 'http';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="
            !rounded-bl-none !rounded-tl-none group-hover:!bg-white 
            group-hover:text-black px-2 !border-0 focus-visible:!outline-none
            focus-visible:!ring-0 focus-within:border-none
          "
          rounded="sm"
          size="sm"
          hoverEffect={false}
        >
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-inter border border-black-50 !bg-black text-white/80 m-2 w-80"
        side="bottom"
        align="end"
      >
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenuLabel className="text-base font-normal flex flex-col gap-y-1 font-inter">
            <span className="text-xs text-white/60">
              {website?.websiteName}: {websiteUrlEditor}
            </span>
            {website?.websiteUrl ? (
              <div className="flex items-center justify-between w-full">
                {websiteUrlEditor ? (
                  <input
                    type="text"
                    className="w-full text-white/80 bg-transparent focus-visible:outline-none placeholder:text-[10px]"
                    value={websiteUrlEditable}
                    onChange={(e) => {
                      setWebsiteUrlEditable(e.target.value);
                    }}
                  />
                ) : (
                  <Link
                    className="text-sm text-white group flex items-center gap-x-1 hover:underline"
                    href={`${env}://${website?.websiteUrl}`}
                    prefetch
                    target="_blank"
                  >
                    {website?.websiteUrl || 'Not Published'}
                    <ArrowRightIcon className="relative size-3 opacity-0 group-hover:opacity-100 -left-2 group-hover:left-0 duration-300 transition-all" />
                  </Link>
                )}
                <button
                  onClick={() => {
                    setWebsiteUrlEditor(!websiteUrlEditor);
                    console.log(websiteUrlEditor);
                  }}
                >
                  <Pencil1Icon
                    className="cursor-pointer transition-colors duration-300"
                    style={{
                      color: websiteUrlEditor ? '#6725f2' : '#ffffff'
                    }}
                  />
                </button>
              </div>
            ) : (
              <span className="text-sm text-white">Not Published</span>
            )}
          </DropdownMenuLabel>
        </motion.div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
          <PublishDropdownItems website={website} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
