'use client';
import { websites as Website } from '@prisma/client';
import Link from 'next/link';

export default function WebsiteCard(website: Website) {
  return (
    <Link
      key={website.websiteId}
      className="flex flex-col gap-y-2 border border-black-50 rounded-lg p-5 w-1/2"
      href={`/site/${website.websiteId}`}
    >
      <span className="text-base font-poppins text-white">
        {website.websiteName}
      </span>
    </Link>
  );
}
