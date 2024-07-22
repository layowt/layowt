'use client';
import { setWebsite } from '@/utils/websites/set-website';
import { Website } from '@prisma/client';

export default function PageClient({ website }: { website: Website }) {
  // set the website in the store
  setWebsite(website);

  return website.websiteName;
}
