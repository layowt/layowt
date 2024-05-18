'use client';
import { setWebsite } from '@/utils/websites/setWebsite';
import { websites } from '@prisma/client';

export default function PageClient({ website }: { website: websites }) {
  // set the website in the store
  setWebsite(website);

  return website.websiteName;
}
