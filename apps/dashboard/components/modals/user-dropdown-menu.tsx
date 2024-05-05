'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { ReloadIcon } from '@radix-ui/react-icons';
import MaterialSymbolsSettingsOutlineRounded from '@/ui/icons/settings';
import IcRoundLogOut from '@/ui/icons/logout';
import IcOutlineDarkMode from '@/ui/icons/darkmode';
import IcSharpHelpOutline from '@/ui/icons/help';
import { cn } from '@/lib/utils';
import useCurrentTheme from '@/hooks/useCurrentTheme';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

export default function UserDropdownMenu({
  className = '',
  siteLogo,
  ...props
}: {
  className?: string;
  siteLogo?: string;
}) {
  // new supabase client instance so we can get the current user data;
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User>(null);

  let init = false;
  // on mount get the user data
  useEffect(() => {
    if (init) return;
    init = true;
    const getCurrentUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      // exit early if error
      if (error) {
        return;
      }
      // redirect user if we cannot find the session
      // TODO: show a toast/sonner here so the user know the cause of the redirect
      if (!user || !user.user.email) {
        router.push('/login');
      }
      setUser(user.user);
    };
    getCurrentUser();
  }, []);

  const { theme, toggleTheme } = useCurrentTheme();

  const items = [
    {
      name: 'Account Settings',
      icon: <MaterialSymbolsSettingsOutlineRounded />
    },
    {
      name: 'Theme',
      icon: theme === 'dark' ? <IcOutlineDarkMode /> : '🌞',
      onClick: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme();
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    },
    {
      name: 'Help',
      icon: <IcSharpHelpOutline />
    },
    {
      name: 'separator'
    },
    {
      name: 'Logout',
      icon: <IcRoundLogOut />,
      onClick: () => supabase.auth.signOut()
    }
  ];

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            className,
            'hover:bg-black-50 duration-300 rounded-lg size-7 flex items-center justify-center'
          )}
        >
          {siteLogo?.length > 0 ? (
            <img
              src={siteLogo}
              alt="site logo"
              className="rounded-full"
            />
          ) : (
            <button
              className="
								size-full flex gap-x-0.5 items-center justify-center 
                bg-electric-violet-500 rounded-full px-[0.55rem] py-1 min-w-6 min-h-6
							"
            >
              <span className="flex items-center justify-center text-[0.65rem]">
                {user?.email ? (
                  user?.email.charAt(0).toUpperCase()
                ) : (
                  <ReloadIcon className="size-2 my-1 animate-spin" />
                )}
              </span>
            </button>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-poppins border border-black-50 !bg-black-75 text-white/80 m-1">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenuLabel className="text-sm font-normal">
            {user?.email}
          </DropdownMenuLabel>
        </motion.div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup className="flex flex-col">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="list-none w-full"
            >
              {item.name === 'separator' ? (
                <DropdownMenuSeparator
                  key={index}
                  className="!bg-black-50"
                />
              ) : (
                <button
                  key={index}
                  className="
									px-2 py-1 hover:border-none hover:!ring-0 hover:bg-black-50 rounded w-full"
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-x-2">
                    <div className="size-5">{item.icon}</div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                </button>
              )}
            </motion.li>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
