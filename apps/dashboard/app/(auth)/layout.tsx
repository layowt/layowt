'use client';
import SiteLogo from '@/components/logo';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default async function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const pathname = usePathname();

  // if the user is logged in, redirect them to the dashboard
  const user = await supabase.auth.getUser();

  if (user?.data?.user?.id) {
    redirect('/dashboard');
  }

  return (
    <>
      <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        <div className="w-full flex justify-between p-5 absolute top-0">
          <SiteLogo className="text-white z-20 hover:cursor-auto" />
          <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
            {pathname === '/login' ? (
              <span>Don&apos;t have an account?</span>
            ) : (
              <span>Already building?</span>
            )}
            <Link
              href={pathname === '/login' ? '/sign-up' : '/login'}
              className="
                cursor-pointer bg-electric-violet hover:bg-electric-violet-600 
                duration-300 px-4 py-2 rounded-sm shadow-md shadow-electric-violet-700
              "
            >
              {pathname === '/login' ? 'Sign Up' : 'Login'}
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
