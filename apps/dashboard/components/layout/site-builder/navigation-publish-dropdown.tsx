import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import type { websites as Website } from '@prisma/client';
import Link from 'next/link';
import { getEnv, getTimeStamp } from '@/utils/index';

export default function SiteBuilderPublishModal({
  website
}: {
  website: Website;
}) {
  const env = getEnv() === 'production' ? 'https' : 'http';

  const dropdownOptions = [
    {
      name: 'lastUpdated',
      html: (
        <div className="flex items-center gap-x-2 text-xs p-2">
          <span className="flex items-center gap-x-1">
            Last updated
            <p className="bg-black-50 p-1 rounded">
              {getTimeStamp(website?.lastUpdated)}
            </p>
          </span>
        </div>
      )
    },
    {
      name: 'separator'
    },
    {
      name: 'publish',
      html: (
        <Button
          variant="secondary"
          className="p-2"
        >
          <span className="">Publish</span>
        </Button>
      )
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="!rounded-bl-none !rounded-tl-none group-hover:!bg-white group-hover:text-black px-2"
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
            <span className="text-xs text-white/60">Site Domain</span>
            {website?.websiteUrl ? (
              <Link
                className="text-sm text-white group flex items-center gap-x-1 hover:underline"
                href={`${env}://${website?.websiteUrl}`}
                prefetch
              >
                {website?.websiteUrl || 'Not Published'}
                <span>
                  <ArrowRightIcon className="relative size-3 opacity-0 group-hover:opacity-100 -left-2 group-hover:left-0 duration-300 transition-all" />
                </span>
              </Link>
            ) : (
              <span className="text-sm text-white">Not Published</span>
            )}
          </DropdownMenuLabel>
        </motion.div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
