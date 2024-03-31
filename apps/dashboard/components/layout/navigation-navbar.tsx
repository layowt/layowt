'use client';
import { Button } from '@/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/ui/command';
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  ReloadIcon,
  EnvelopeClosedIcon
} from '@radix-ui/react-icons';

import { useState, useEffect } from 'react';
import useKeyboard from '@/hooks/useKeyboard';
import { createClient } from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export default function DashboardNavBar() {
  // new supabase client instance so we can get the current user data;
  const supabase = createClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User>(null);

  // open the command dialog when the user presses '⌘ + k'
  useKeyboard('k', () => setOpen(true));

  let init = false;
  // on mount get the user data
  useEffect(() => {
    if (init) return;
    init = true;
    const getCurrentUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();

      // exit early if error
      if (error) throw new Error('Error getting user data', error);

      // redirect user if we cannot find the session
      // TODO: show a toast/sonner here so the user know the cause of the redirect
      if (!user || !user.user.email) {
        router.push('/login');
      }

      setUser(user.user);
    };
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="w-full h-16 border-b border-black-50">
        <div className="flex justify-center items-center size-full">
          <div className="h-full relative flex items-center">
            <Button
              className="
              flex justify-start items-center border border-black-50 rounded-lg w-64 h-3/5 py-1.5 
              pl-6 font-poppins hover:text-white text-white/60 group text-[0.65rem]
              "
              variant="none"
              onClick={() => setOpen(!open)}
            >
              <MagnifyingGlassIcon className="absolute left-2 size-3" />
              <span>Search</span>
              <p className="text-sm text-muted-foreground">
                <kbd
                  className="
                   bg-transparent pointer-events-none inline-flex h-5 select-none items-center gap-[2px] rounded border px-1.5 text-[10px] font-medium   
                   opacity-100 !border-none absolute right-1.5 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:!text-white
                  "
                >
                  <span>⌘</span>k
                </kbd>
              </p>
            </Button>
          </div>
          <div className="flex items-center gap-x-2.5 text-white/60 absolute right-2">
            <BellIcon className="size-3.5" />
            <div className="flex gap-x-0.5 items-center border border-black-50 rounded-lg px-2 py-1">
              <span className="flex items-center justify-center text-xs">
                {user?.email ? (
                  user?.email.charAt(0).toUpperCase()
                ) : (
                  <ReloadIcon className="size-2 animate-spin" />
                )}
              </span>
              <ChevronDownIcon className="size-3" />
            </div>
          </div>
        </div>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
      </CommandDialog>
    </>
  );
}
