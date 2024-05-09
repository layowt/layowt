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
    <div className="h-screen text-white overflow-hidden">
      <div className="fixed top-0 right-0 left-0 box-content z-10">
        <SiteBuilderNavBar />
      </div>
      <div className="flex justify-center relative">
        {/** Left side column on dashboard (placeholder for now) */}
        <div className="bg-black-75 h-screen w-1/5 fixed left-0 border-r border-black-50"></div>
        <div className="w-3/5 h-screen flex justify-center items-center fixed overflow-hidden">
          {children}
        </div>
        {/** Right side column on dashboard (placeholder for now) */}
        <div className="bg-black-75 h-screen w-1/5 fixed right-0 border-l border-black-50"></div>
      </div>
    </div>
  );
}
