'use client';
import SiteBuilderNavBar from '@/components/layout/site-builder/navigation-navbar';
import { useAppSelector } from '@/lib/hooks';
import { device } from '@/store/slices';
import { website } from '@/store/slices/website-store';

export default function SiteBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  //const selectedDevice = useAppSelector(device);
  //const currentWebsite = useAppSelector(website);

  return (
    <div className="h-screen text-white">
      <SiteBuilderNavBar />
      {children}
    </div>
  );
}
