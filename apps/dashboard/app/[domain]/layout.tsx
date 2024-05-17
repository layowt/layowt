import '../styles/globals.css';


import DyanmicHead from '@/components/layout/dynamic-head';

export default function SiteLayout({ children }: { children: React.ReactNode }){
  return (
    <html
      lang="en"
    >
      <DyanmicHead />
      <body className="h-screen text-black"> 
        {children}
      </body>
    </html>
  );
}
