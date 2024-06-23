import '../styles/globals.css';
import { CairoFont, InterFont, PoppinsFont, SatoshiFont } from '../styles/fonts'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { Toaster } from '@/ui/sonner';

import StoreProvider from '@/store/store-provider';
import { Metadata } from 'next';
import { cn } from '@/utils/index';

const title = 
  'Layowt | Build your next digital product with ease'
const description = 
  'Layowt is the all-in-one platform for creating your next digital product'

export const metadata: Metadata = {
  title,
  description
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
          className={cn(CairoFont.variable, PoppinsFont.variable, InterFont.variable, SatoshiFont.variable)}
        >
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale:1, user-scalable=no"
          />
          <body
            className="bg-black-300 min-h-screen !overflow-hidden"
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
