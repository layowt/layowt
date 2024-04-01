import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SiteLogo from '@/components/logo';

const fetchUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    throw new Error('User not found', error);
  }

  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  Promise.resolve(data.user);
};

export default async function App() {
  // get the user
  const user = await fetchUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full h-screen text-white font-poppins flex justify-center">
      <div className="flex flex-col w-full justify-center items-center">
        <SiteLogo />
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    </div>
  );
}
