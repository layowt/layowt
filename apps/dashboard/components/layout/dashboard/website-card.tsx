'use client';
import {
  DotsHorizontalIcon,
  CameraIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons';

import { websites as Website } from '@prisma/client';
import Link from 'next/link';
import WebsiteCardModal from '@/components/modals/dashboard/website-card-modal';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { getEnv } from '@/utils/index';

export default function WebsiteCard(website: Website, index: number) {
  const env = getEnv() === 'production' ? 'https' : 'http';

  return (
    <motion.div
      key={website.websiteId}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative"
    >
      <div
        key={website.websiteId}
        className="flex flex-col gap-y-2 border border-black-50 bg-black-75 rounded-lg p-5 w-full relative group"
      >
        <div className="absolute top-3 left-3 border-4 border-black-75 rounded-sm">
          {website.websiteLogo ? (
            <img
              src={website.websiteLogo}
              alt={website.websiteName}
              className="size-8 rounded-sm"
            />
          ) : (
            <div className="size-8 bg-electric-violet rounded-sm flex items-center justify-center text-sm">
              {website.websiteName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <Link
          className="bg-black-50 w-full lg:h-64 rounded-sm flex justify-center items-center"
          href={`/site/${website.websiteId}`}
          prefetch
        >
          <CameraIcon className="size-8 text-white/50 group-hover:size-10 transition-all duration-300" />
        </Link>
        <div className="flex w-full justify-between items-center mt-8">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <span className="text-heading-xl text-white">
                {website.websiteName}
              </span>
              <ArrowRightIcon className="size-4 opacity-0 group-hover:opacity-100 duration-300 transition-all" />
            </div>
            <Link
              href={`${env}://${website.websiteUrl}` || '#'}
              className="text-xs text-white/50 hover:underline font-inter"
              prefetch
            >
              {website.websiteUrl || 'Not Published'}
            </Link>
          </div>
          <DropdownMenu key={website?.websiteId}>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="text-xs pr-0 z-[100] absolute left-auto right-5" />
            </DropdownMenuTrigger>
            <WebsiteCardModal website={website} />
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
