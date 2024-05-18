import '../styles/globals.css';

export default function SiteLayout({ children }: { children: React.ReactNode }){
  return (
    <html
      lang="en"
    >
      <body className="h-screen text-black"> 
        {children}
      </body>
    </html>
  );
}
