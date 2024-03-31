import './styles/globals.css';
import { Cairo, Poppins, Kanit, Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { Toaster } from '@/ui/sonner';

import StoreProvider from '@/store/store-provider';
import UserAuthentication from '@/components/user-auth';

const CairoFont = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  style: 'normal'
});

const PoppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const KanitFont = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const InterFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  style: 'normal',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'Dashboard | Draggle'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className={`${CairoFont.variable} ${PoppinsFont.variable} ${KanitFont.variable} ${InterFont.variable}`}
      >
        {/* className="bg-gradient-to-b from-black-200 to-electric-violet-950  min-h-screen" */}
        <body
          className="bg-[#05050A] min-h-screen"
          suppressHydrationWarning={true}
        >
          <UserAuthentication>
            {/* <Theme className="bg-grid-white/[0.03]"> */}
            <Theme>
              {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div> */}
              <div className="flex flex-col relative">
                <main>{children}</main>
                <Toaster
                  closeButton
                  className="z-[100] group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto"
                />
              </div>
            </Theme>
          </UserAuthentication>
        </body>
      </html>
    </StoreProvider>
  );
}
