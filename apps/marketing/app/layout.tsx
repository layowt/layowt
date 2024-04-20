import './styles/globals.css';
import { Cairo, Poppins, Kanit, Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import SiteLogo from '~/components/logo';
import { Toaster } from '~/components/ui/sonnner';

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
  title: 'Draggle'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${CairoFont.variable} ${PoppinsFont.variable} ${KanitFont.variable} ${InterFont.variable}`}
    >
      <body
        className="bg-[#05050A] min-h-screen max-h-screen flex justify-center items-center"
        suppressHydrationWarning={true}
      >
        <Theme>
          <div className="min-h-full w-full bg-[#05050A] bg-dot-white/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col relative">
              <header className="flex items-center justify-between p-7 w-full text-white absolute top-0 z-30">
                <SiteLogo
                  logoSize="size-7"
                  className="text-xl"
                />
              </header>
              <main>{children}</main>
              <Toaster
                closeButton
                className="z-[100] group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto"
              />
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
