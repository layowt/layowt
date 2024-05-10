'use client';
import SiteBuilderNavBar from '@/components/layout/site-builder/navigation-navbar';
import SiteBuilderCanvas from '@/components/website/builder/canvas';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setWebsite, website } from '@/store/slices/website-store';
import { useEffect, useRef } from 'react';

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
        <div className="bg-black-75 h-screen w-1/6 fixed left-0 border-r border-black-50"></div>
        <SiteBuilderCanvas />
        {/** Right side column on dashboard (placeholder for now) */}
        <div className="bg-black-75 h-screen w-1/6 fixed right-0 border-l border-black-50"></div>
      </div>
    </div>
  );
}
