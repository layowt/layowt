'use client';
// shadcn imports
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

import { getUserFromDb } from '@/utils/user/getUserById';

// use router as we are in a client component
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// react imports
import { useEffect, useState } from 'react';

//supabase
import { createClient } from '@/utils/supabase/client';

// type imports
import type { User } from '@supabase/supabase-js';

export default function UserAuthModal({
  currentUserObject
}: {
  currentUserObject: User | null;
}) {
  // TODO: CHECK IF THE EMAIL IS ALREADY AUTHED ON PAGE LOAD
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [showModal, setShowModal] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const x = async () => {
    const email = await getUserFromDb(searchParams.get('uid') ?? '');

    return email;
  };

  // Effects TODO: LOOK INTO REFACTORING INTO REACT QUERY
  useEffect(() => {
    // on initial render set the isClient to true
    setIsClient(true);

    // check if the user is logged in
    // if the user is present, clear the URL of the waiting_for_auth query param
    if (currentUserObject) {
      router.replace('/pricing', undefined);
    }
  }, []);

  useEffect(() => {
    // create a subscription to the user object
    const channel = supabase
      .channel('User Email Authenticated')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `uid=eq.${searchParams.get('uid') ?? null}`
        },
        (payload) => {
          // @ts-expect-error
          if (payload.new.hasAuthenticatedEmail === true) {
            // hide the modal for now
            setShowModal(false);

            // remove the 'waiting_for_auth' query param
            router.replace('/pricing', undefined);

            // clear the userId cookie
          } else {
            setShowModal(true);
          }
        }
      )
      .subscribe();

    //console.log(channel.joinPush.payload.config.postgres_changes[0]);

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, pathname]);

  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    // Reset loading state when pathname changes
    setLoading(false);

    const fetchData = async () => {
      const userEmail = await x(); // Wait for the promise to resolve
      setUserEmail(userEmail.email);
    };

    // let's set this as a cookie to avoid the user from seeing the modal again
    if (searchParams.get('uid')) {
      setNewUser(true);

      // fetch the data if the uid is present in the url
      fetchData();
    }
  }, [pathname, searchParams]);

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

  const getUserEmail = async () => {
    if (searchParams.get('uid') === null)
      return console.error('No uid found in the search params');

    // need to get the user email from the db via the id from the search params
    const userEmail = await supabase
      .from('users')
      .select('*')
      .eq('uid', searchParams.get('uid'));

    // we need the user email in order to send the verification email
    if (!userEmail.data || !userEmail.data[0]?.email) {
      toast.error('No user found');
      throw new Error('No user found');
    }

    setUserEmail(userEmail.data[0].email);
  };

  // do not display the modal if the user is on the sign-up page
  if (pathname === '/sign-up' || currentUserObject) return '';

  if (searchParams.get('access_token')) return '';

  return isClient && currentUserObject === null ? (
    <>
      <Dialog
        modal={true}
        defaultOpen={true}
        open={showModal}
      >
        <Toaster
          closeButton
          className="z-[100] group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto"
        />
        <DialogContent
          hidden={false}
          className="bg-black border border-gray-700 rounded-lg py-10 max-w-md"
          showCloseButton={false}
        >
          {newUser ? (
            <DialogTitle className="text-center flex flex-col gap-y-6 items-center text-white">
              <div className="flex flex-col gap-y-2">
                <div className=""></div>
                <h2 className="text-2xl font-poppins">
                  Please verify your email
                </h2>
                <span className="text-xs font-kanit leading-relaxed font-light max-w-[70%] flex self-center">
                  We have sent an email to {userEmail} with a link to verify
                  your account.
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
          ) : (
            <div className="flex flex-col gap-y-3 items-center text-white">
              <h2 className="text-3xl font-bold text-center">
                You need to log in
              </h2>
              <p className="text-center">Click the button below to log in.</p>
              <Button
                className="border border-white w-fit px-6 bg-black"
                onClick={() => {
                  setLoading(true);
                  router.push('/sign-up');
                }}
              >
                {loading ? (
                  <ReloadIcon className="w-3 h-3 animate-spin" />
                ) : (
                  'Log in'
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  ) : null;
}
