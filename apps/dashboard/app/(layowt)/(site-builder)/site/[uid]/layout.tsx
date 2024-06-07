'use server';
import SiteBuilderNavBar from '@/components/layout/site-builder/navigation/navbar';
import SiteBuilderOptionsLeft from '@/components/layout/site-builder/site-builder-left';
import DebugTools from '@/components/website/builder/debug-tools';

export default async function SiteBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen text-white overflow-hidden">
      <div className="fixed top-0 right-0 left-0 box-content z-50">
        <SiteBuilderNavBar />
      </div>
      <div className="flex justify-center relative">
        {/** Left side column on dashboard (placeholder for now) */}
        <SiteBuilderOptionsLeft />
        {/** canvas entry point */}
          {children}
        {/** Right side column on dashboard (placeholder for now) */}
        <div className="bg-black-300 h-screen w-1/6 fixed right-0 border-l border-black-50"></div>
      </div>
      <DebugTools />
    </div>
  );
}
