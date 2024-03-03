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
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default function UserAuthModal({
  currentUserObject,
  currentUserId
}: {
  currentUserObject: User | null;
  currentUserId: string | undefined;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);

    // check if the user is logged in
    // if the user is present, clear the URL of the waiting_for_auth query param
    if (currentUserObject) {
      console.log('currentUser', currentUserObject);
      router.replace('/pricing', undefined);
    }
  }, []);

  useEffect(() => {
    console.log(currentUserId);
    // create a subscription to the user object
    const channel = supabase
      .channel('User Email Authenticated')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'User'
        },
        () => console.log('Record updated!')
      )
      .subscribe();

    console.log(channel);

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    // Reset loading state when pathname changes
    setLoading(false);
    // if the user is waiting for MFA, show the 'waiting for MFA' modal
    if (searchParams.get('waiting_for_auth')) setNewUser(true);
  }, [pathname]);

  // do not display the modal if the user is on the sign-up page
  if (pathname === '/sign-up') return '';

  return isClient && currentUserObject === null ? (
    <>
      <Dialog
        modal={true}
        defaultOpen={true}
        open={true}
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
  ) : (
    ''
  );
}
