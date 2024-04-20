'use client';
import { useState } from 'react';
import { signUp } from '@/utils/sign-up';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';

export default function SignUpContent() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      await signUp(email);
      toast('Signed up successfully! 🎉');
    } catch (e) {
      console.error(e);
      toast('An error occurred. Please try again.', {
        description: e.message
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-6 justify-center text-white z-20 w-full md:w-auto items-center">
      <div className="relative flex max-w-fit md:w-auto justify-center">
        <div className="absolute inset-0 bg-electric-violet-500 rounded-lg blur mt-8 hidden md:flex"></div>
        <form
          className="
					flex flex-col md:flex-row gap-y-4 mt-8 items-center gap-x-4 self-center w-full max-w-[90%] sm:max-w-[70%] md:max-w-[100%] md:w-auto
					md:bg-black p-2 border-none md:!border-solid md:border md:!border-white/20 rounded-lg relative
				"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="
						min-w-full p-2 md:min-w-80 md:min-h-full bg-black
						focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50
						text-white placeholder:text-white/85 placeholder:font-poppins placeholder:!leading-relaxed
						md:max-w-40 text-lg border border-solid border-white/20 md:border-none h-14 md:h-10
					"
          />
          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto text-lg"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
      <h6 className="font-inter md:text-xl text-center">
        Sign up for early access and get{' '}
        <span className="font-bold text-electric-violet">50%</span> off your
        first month.
      </h6>
    </div>
  );
}
