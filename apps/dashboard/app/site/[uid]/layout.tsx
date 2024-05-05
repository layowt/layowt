'use client';
import SiteBuilderNavBar from '@/components/layout/site-builder/navigation-navbar';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { device } from '@/store/slices';
import { setWebsite, website } from '@/store/slices/website-store';

export default function SiteBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  //const selectedDevice = useAppSelector(device);
  const currentWebsite = useAppSelector(website);

  // set the current site in redux here
  // this is the top level of the site builder
  dispatch(setWebsite(currentWebsite));

  return (
    <div className="h-screen text-white">
      <SiteBuilderNavBar />
      {children}
    </div>
  );
}
