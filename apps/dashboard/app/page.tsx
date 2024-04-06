import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SiteLogo from '@/components/logo';

const fetchUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) {
    throw new Error('User not found', error);
  }
  return data.user;
};

export default async function App() {
  // get the user
  const user = await fetchUser();

  // redirect to the dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full h-screen text-white font-poppins flex justify-center">
      <div className="flex gap-x-1 w-full justify-center items-center">
        <SiteLogo
          className="p-0"
          showName={false}
        />
        <h1 className="font-bold font-poppins group-hover:text-white/60 duration-300">
          Loading...
        </h1>
      </div>
    </div>
  );
}
