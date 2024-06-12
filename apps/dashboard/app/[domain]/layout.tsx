import MadeWith from '@/components/site/made-with';
import '../styles/globals.css';

export default function SiteLayout({ children }: { children: React.ReactNode }){
  return (
    <html
      lang="en"
    >
      <body className="h-screen text-black"> 
        {children}
        <MadeWith />
      </body>
    </html>
  );
}
