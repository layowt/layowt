'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// shadcn imports
import { DialogTitle } from '@/components/ui/dialog';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { getUserFromDb } from '@/utils/user/getUserById';

/** Modal content to display if we are waiting for the user to confirm the OTP */
export default function WaitingForAuth({ supabase }: { supabase: any }) {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState('');

  /** run onMounted to get the user's email from the db */
  useEffect(() => {
    const fetchData = async () => {
      const email = await getUserFromDb(searchParams.get('uid') ?? '');
      if (!email) return;

      setUserEmail(email.email);
    };

    // fetch the data if the uid is present in the url
    fetchData();
  }, []);

  /** Method to resend a verification email upon request */
  const resendVerificationEmail = async () => {
    try {
      if (!userEmail) return;

      const promise = () =>
        new Promise<void>(async (resolve) => {
          await supabase.auth.resend({
            type: 'signup',
            email: userEmail,
            options: {
              emailRedirectTo: '/dashboard'
            }
          });
          resolve();
        });

      toast.promise(promise, {
        loading: 'Sending verification email...',
        success: () => {
          return `Check your inbox at ${userEmail} to verify your email.`;
        },
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto'
        }
      });
    } catch (error) {
      // TODO: USE SONNER HERE TO DISPLAY ERROR
      console.error(error);
    }
  };

  return (
    <DialogTitle className="text-center flex flex-col gap-y-6 items-center text-white">
      <div className="flex flex-col gap-y-2">
        <div className=""></div>
        <h2 className="text-2xl font-poppins">Please verify your email</h2>
        <span className="flex-wrap text-xs font-kanit leading-relaxed font-light max-w-[70%] flex justify-center self-center">
          We have sent an email to&nbsp;
          <span className="font-bold">
            {userEmail ? (
              userEmail + '.'
            ) : (
              <ReloadIcon className="w-3 h-3 animate-spin" />
            )}
          </span>
          Click the link to verify your account.
        </span>
      </div>

      <div className="flex gap-x-4">
        <Button
          onClick={resendVerificationEmail}
          className="w-fit bg-purple text-white duration-300 hover:bg-purple/60"
        >
          Resend Email
        </Button>

        <Button className="bg-transparent text-white border border-gray-700 hover:text-pink hover:bg-transparent hover:border-pink duration-300">
          Update Email
        </Button>
      </div>
    </DialogTitle>
  );
}
