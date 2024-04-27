'use client';
import SiteBuilderNavBar from '@/components/layout/site-builder/navigation-navbar';
import { useAppSelector } from '@/lib/hooks';
import { device } from '@/store/slices';

export default function SiteBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const selectedDevice = useAppSelector(device);

  return (
    <div className="h-screen text-white">
      <SiteBuilderNavBar />
      {selectedDevice}
      {children}
    </div>
  );
}
