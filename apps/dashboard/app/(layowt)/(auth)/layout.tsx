// components
import AuthenticationButton from '@/components/auth/layout/button';
import SiteLogo from '@/components/logo';
import useToaster from '~/packages/hooks/useToaster';

export default async function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const toast = useToaster({
    message: "Welcome to the dashboard",
    type: "success",
    duration: 5000,
    position: "bottom-right"
  })

  return (
    <div className="min-h-full w-full bg-grid-small-white/5 relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="w-full flex justify-between p-5 absolute top-0">
        <SiteLogo className="text-white z-20 hover:cursor-auto" />
        <AuthenticationButton />
      </div>
      {children}
    </div>
  );
}
