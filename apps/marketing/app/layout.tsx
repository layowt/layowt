import { Theme } from '@radix-ui/themes';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gradient-to-b from-black-200 to-electric-violet-950 min-h-screen"
        suppressHydrationWarning={true}
      >
        <Theme>
          <div className="flex flex-col px-20">
            <div>{children}</div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
