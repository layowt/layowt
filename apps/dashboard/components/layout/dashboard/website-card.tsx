'use client';
import {
  DotsHorizontalIcon,
  CameraIcon,
  ArrowRightIcon
} from '@radix-ui/react-icons';

import { websites as Website } from '@prisma/client';
import Link from 'next/link';
import WebsiteCardModal from '@/components/modals/dashboard/website-card-modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';

export default function WebsiteCard(website: Website, index: number) {
  return (
    <motion.div
      key={website.websiteId}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative"
    >
      <Link
        key={website.websiteId}
        className="flex flex-col gap-y-2 border border-black-50 bg-black-75 rounded-lg p-5 w-full relative group"
        href={`/site/${website.websiteId}`}
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
        <div className="bg-black-50 w-full lg:h-64 rounded-sm flex justify-center items-center">
          <CameraIcon className="size-8 text-white/50 group-hover:size-10 transition-all duration-300" />
        </div>
        <div className="flex w-full justify-between items-center mt-8">
          <div className="flex flex-col">
            <div className="flex gap-x-2 items-center">
              <span className="text-xl font-inter text-white">
                {website.websiteName}
              </span>
              <ArrowRightIcon className="size-4 opacity-0 group-hover:opacity-100 duration-300 transition-all" />
            </div>
            <p className="text-xs text-white/50">www.testing.com</p>
          </div>
          <DropdownMenu key={website?.websiteId}>
            <DropdownMenuTrigger asChild>
              <DotsHorizontalIcon className="text-xs pr-0 z-[100] absolute left-auto right-5" />
            </DropdownMenuTrigger>
            <WebsiteCardModal website={website} />
          </DropdownMenu>
        </div>
      </Link>
    </motion.div>
  );
}
