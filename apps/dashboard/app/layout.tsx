import './styles/globals.css';
import { CairoFont, InterFont, PoppinsFont } from './styles/fonts'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { Toaster } from '@/ui/sonner';

import StoreProvider from '@/store/store-provider';
import { Metadata } from 'next';
import { cn } from '../utils';

const title = 
  'Layowt - The all-in-one platform for designing, creating, and managing your online products.'

export const metadata: Metadata = {
  title
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
        className={cn(CairoFont.variable, PoppinsFont.variable, InterFont.variable)}
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
