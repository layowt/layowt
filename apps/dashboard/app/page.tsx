import { redirect } from 'next/navigation';
import SiteLogo from '@/components/logo';
import getUserFromSession from '@/utils/user/getUserFromSession';

export default async function App() {
  // get the user
  const user = await getUserFromSession();

  if (!user) {
    throw new Error('User not found');
  }

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
