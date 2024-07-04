'use client'
// components
import SiteLogo from '@/components/logo';
import { getQueryParams } from '~/packages/utils/src/get-query-params';

export default async function WelcomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryParams = getQueryParams({
    keys: ['x', 'onboarding']
  })

  console.log(queryParams)

  return (
    <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="w-full flex justify-between p-5 absolute top-0">
        <SiteLogo className="text-white z-20 hover:cursor-auto" />
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
