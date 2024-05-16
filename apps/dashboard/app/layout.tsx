import './styles/globals.css';
import { Cairo, Poppins, Kanit, Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { Toaster } from '@/ui/sonner';

import StoreProvider from '@/store/store-provider';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Dashboard | Layowt'
};

export default async function RootLayout({
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
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale:1, user-scalable=no"
        />
        <body
          className="bg-[#05050A] min-h-screen"
          suppressHydrationWarning={true}
        >
          <Theme>
            <div className="flex flex-col relative">
              <main>{children}</main>
              <Toaster
                closeButton
                className="z-[100] group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto"
              />
            </div>
          </Theme>
        </body>
      </html>
    </StoreProvider>
  );
}
