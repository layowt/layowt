import { createClient } from '@/utils/supabase/server';
import UserAuthModal from '@/components/modals/user-auth';

export default async function UserAuthentication({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  // check the current path of the user

  // if the user is not logged in, show a modal to allow the user to log in
  return (
    <>
      {!user.user ? <UserAuthModal /> : ''}
      {children}
    </>
  );
}
