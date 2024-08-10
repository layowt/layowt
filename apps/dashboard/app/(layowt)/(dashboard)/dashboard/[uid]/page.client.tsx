'use client';
import { setWebsite } from '@/utils/websites/set-website';
import { Website } from '@prisma/client';
import Link from 'next/link';

export default function PageClient({ website }: { website: Website }) {
  // set the website in the store
  setWebsite(website);

  return (
    <div className="flex flex-col gap-y-4">
      site name: {website.websiteName}
      <Link href={`/site/${website.websiteId}`}>
        site builder
      </Link>
    </div>
  )
}
