'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// shadcn imports
import { DialogTitle } from '@/components/ui/dialog';
import { ReloadIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { useInterval } from '@/hooks/useInterval';

import { getUserFromDb } from '@/utils/user/getUserById';

/** Modal content to display if we are waiting for the user to confirm the OTP */
export default function WaitingForAuth({ supabase }: { supabase: any }) {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState('');

  const [seconds, setSeconds] = useState(5);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  /** run onMounted to get the user's email from the db */
  useEffect(() => {
    const fetchData = async () => {
      const email = await getUserFromDb(searchParams.get('uid') ?? '');
      if (!email) return;

      setUserEmail(email.email);
    };

    // fetch the data if the uid is present in the url
    fetchData();

    // start the interval countdown on page mount
    interval.start();
    return interval.stop;
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

      // reset the seconds to 5
      setSeconds(5);
      // start the interval again
      interval.start();

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
    <DialogTitle className="flex flex-col gap-y-6 text-white">
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <CheckCircledIcon className="size-6" />
        <h2 className="text-xl font-poppins mt-2">Check your email</h2>
        <span className="flex-wrap text-[0.65rem] font-poppins leading-relaxed font-light flex justify-center">
          We have sent an email to&nbsp;
          <span className="font-medium">
            {userEmail ? (
              userEmail
            ) : (
              <ReloadIcon className="w-3 h-3 animate-spin" />
            )}
          </span>
          Click the link to verify your account.
        </span>
      </div>
      <div className="flex gap-x-4 justify-center w-full">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={resendVerificationEmail}
                className={`
									w-full bg-purple text-white duration-300 hover:bg-purple/60 
									${seconds == 0 ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}
								`}
                autoFocus={false}
                disabled={seconds != 0}
              >
                Resend Email
              </Button>
            </TooltipTrigger>
            {seconds != 0 ? (
              <TooltipContent side="bottom">
                <p className="text-xs">Resend Email in {seconds} seconds</p>
              </TooltipContent>
            ) : (
              ''
            )}
          </Tooltip>
        </TooltipProvider>

        <Button className="w-fit bg-transparent text-white border border-gray-700 hover:text-pink hover:bg-transparent hover:border-pink duration-300">
          Update Email
        </Button>
      </div>
    </DialogTitle>
  );
}
