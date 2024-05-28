'use client';
import LoginNavigation from '@/components/auth/layout/login';
import SignupNavigation from '@/components/auth/layout/sign-up';
import SiteLogo from '@/components/logo';
import { usePathname } from 'next/navigation';

export default async function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="w-full flex justify-between p-5 absolute top-0">
        <SiteLogo className="text-white z-20 hover:cursor-auto" />
        {pathname === '/login' && <LoginNavigation />}
        {pathname === '/sign-up' && <SignupNavigation />}
      </div>
      {children}
    </div>
  );
}
