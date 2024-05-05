'use client';
import SiteLogo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div>
        <div className="w-full flex justify-between p-5 absolute top-0">
          <SiteLogo className="text-white z-20" />
          <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
            <span>Already building?</span>
            <Button
              variant="secondary"
              rounded="sm"
            >
              Login
            </Button>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
