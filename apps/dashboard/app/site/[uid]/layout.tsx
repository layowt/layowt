import SiteBuilderNavBar from '@/components/layout/site-builder/navigation-navbar';

export default function SiteBuilderLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <SiteBuilderNavBar />
      {children}
    </div>
  );
}
