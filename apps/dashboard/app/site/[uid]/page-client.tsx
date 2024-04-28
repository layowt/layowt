'use client';
import type { websites as Website } from '@prisma/client';
import { setWebsite } from '@/utils/websites/setWebsite';

export default function SiteBuilderClient({ website }: { website: Website }) {
  setWebsite(website);
  return <></>;
}
