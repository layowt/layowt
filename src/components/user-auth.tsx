'use client';
import { useUser } from '@/utils/firebase';
import { usePathname } from 'next/navigation';

// This component is a wrapper for the entire app. It checks if the user is authenticated
// and if they are not, it will show a model to sign in or sign up

export default function UserAuthentication({
  children
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  if (user === false) return <>Auth loading...</>;
  if (!user && usePathname() !== '/sign-up' && usePathname() !== '/login')
    return <div>Not Authed</div>;

  return children;
}
