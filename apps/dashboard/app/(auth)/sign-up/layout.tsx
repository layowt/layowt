'use client';
import SiteLogo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        <div className="w-full flex justify-between p-5 absolute top-0">
          <SiteLogo className="text-white z-20 hover:cursor-auto" />
          <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
            <span>Already building?</span>
            <Link
              href="/login"
              className="
                cursor-pointer bg-electric-violet hover:bg-electric-violet-600 
                duration-300 px-4 py-2 rounded-sm shadow-md shadow-electric-violet-700
              "
            >
              Login
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
