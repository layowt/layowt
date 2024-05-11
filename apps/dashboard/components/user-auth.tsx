'use server';
import { User } from '@supabase/supabase-js';
import UserAuthModal from './modals/user-auth';

export default async function UserAuthentication({
  children,
  currentUserObject,
  error
}: {
  children: React.ReactNode;
  currentUserObject: User | null;
  error?: Error;
}) {
  // if the user is not logged in, show a modal to allow the user to log in

  return (
    <>
      <UserAuthModal currentUserObject={currentUserObject} />
      {children}
    </>
  );
}
