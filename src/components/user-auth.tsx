import { createClient } from '@/utils/supabase/server';
import UserAuthModal from '@/components/modals/user-auth';
import { cookies } from 'next/headers';
const cookiesStore = cookies();

export default async function UserAuthentication({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  // const handleRecordUpdated = (payload) => {
  //   console.log('Record updated!', payload);
  // };

  const userId = cookiesStore.get('userId');

  // if the user is not logged in, show a modal to allow the user to log in
  return (
    <>
      {
        <UserAuthModal
          currentUserObject={user.user}
          currentUserId={userId?.value}
        />
      }
      {children}
    </>
  );
}
