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

// use router as we are in a client component
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// react imports
import { useEffect, useState } from 'react';

//supabase
import { createClient } from '@/utils/supabase/client';

// type imports
import type { User } from '@supabase/supabase-js';
import { user } from '@/store/user-store';

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
    // let's set this as a cookie to avoid the user from seeing the modal again
    if (searchParams.get('uid')) {
      setNewUser(true);
    }
  }, [pathname, searchParams]);

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
        <DialogContent
          hidden={false}
          className="bg-black rounded-lg py-10"
          showCloseButton={false}
        >
          {newUser ? (
            <DialogTitle className="text-3xl font-bold text-center">
              Waiting for MFA
            </DialogTitle>
          ) : (
            <div className="flex flex-col gap-y-3 items-center">
              <h2 className="text-3xl font-bold text-center">
                You need to log in
              </h2>
              <p className="text-center">Click the button below to log in.</p>
              <Button
                className="border border-white w-fit px-6"
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
