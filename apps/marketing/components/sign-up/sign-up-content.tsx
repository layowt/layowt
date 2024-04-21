'use client';
import { useState } from 'react';
import { signUp } from '@/utils/sign-up';
import posthog from 'posthog-js';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function SignUpContent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validEmail = (emailAddress: string) => {
    return Boolean(!!emailAddress.match(/.+@.+/));
  };

  const handleSignUp = async () => {
    // reset all states
    setLoading(true);
    setError(false);
    setSignUpSuccess(false);
    try {
      // check if email is valid
      if (!validEmail(email)) {
        setLoading(false);
        setError(true);
        return toast('Please enter a valid email address.', {
          description: 'The email you entered is not valid. Please try again.'
        });
      }

      // sign up
      const res = await signUp(email);

      if (res === 409) {
        // stop spinner
        setLoading(false);
        setError(true);
        // show toast
        return toast('Email already exists. Please try again.', {
          description:
            'You have already signed up with this email. Please try again with a different email.'
        });
      }

      // show toast message
      toast('Signed up successfully! 🎉');
      // set sign up success to true
      setSignUpSuccess(true);
      // capture signed_up event
      posthog.capture('signed_up', { email });
    } catch (e) {
      console.error(e);
      toast('An error occurred. Please try again.', {
        description: e.message
      });
      posthog.capture('signed_up_error', { error: e.message });
    }
    setLoading(false);
  };

  const handleButtonText = () => {
    if (loading) {
      return <ReloadIcon className="size-4 animate-spin min-w-[61px]" />;
    } else if (signUpSuccess) {
      return <span className="min-w-[61px]">🎉</span>;
    } else if (error) {
      return <span className="min-w-[61px]">❌</span>;
    } else {
      return 'Sign Up';
    }
  };

  return (
    <div className="flex flex-col gap-y-6 justify-center text-white z-20 w-full md:w-auto items-center">
      <div className="relative flex w-5/6 sm:w-3/4 md:w-auto justify-center">
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
            autoComplete="email"
          />
          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto text-lg"
            type="submit"
          >
            {handleButtonText()}
          </Button>
        </form>
      </div>
      <h3 className="font-inter md:text-xl text-center">
        Sign up for early access and get{' '}
        <span className="font-bold text-electric-violet">50%</span> off your
        first month.
      </h3>
    </div>
  );
}
