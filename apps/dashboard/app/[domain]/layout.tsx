import DyanmicHead from '@/components/layout/dynamic-head';

export default function SiteLayout({ children }: { children: React.ReactNode }){
  return (
    <>
      <DyanmicHead website={website} />
      <div className="h-screen"> 
          {children}
      </div>
    </>
  );
}
