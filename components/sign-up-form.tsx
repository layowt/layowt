import { useState } from 'react';
import { useUserStore } from '@/state/user-store';

export default function SignUpForm() {
  const { setIsLoading } = useUserStore();

  const handleRegistration = async () => {
    // set the loading spinner
    setIsLoading(true);

    //const signUp = await
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegistration();
      }}
      className="flex flex-col gap-y-8 bg-white/5 rounded-xl p-7 w-96"
    >
      <h3 className="text-3xl font-bold flex justify-center w-full">
        Create an account
      </h3>
    </form>
  );
}
