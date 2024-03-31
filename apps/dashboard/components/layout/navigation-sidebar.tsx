'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, stagger } from 'framer-motion';

// icon imports
import MaterialSymbolsHomeOutlineRounded from '@/ui/icons/home';
import MaterialSymbolsBuildOutlineRounded from '@/ui/icons/build';
import MaterialSymbolsComputerOutlineRounded from '@/ui/icons/computer';
import MaterialSymbolsDataCheck from '@/ui/icons/logs-okay';
import MaterialSymbolsSettingsOutlineRounded from '@/ui/icons/settings';
import MaterialSymbolsChatOutlineRounded from '@/ui/icons/message';
import MaterialSymbolsAnalyticsOutlineRounded from '@/ui/icons/analytics';
import MaterialSymbolsPerson2OutlineRounded from '@/ui/icons/profile';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

export default function DashboardSidebar() {
  // new supabase client instance so we can get the current user data
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User>(null);

  // TODO: make this come from a CMS
  // TODO: If there are errors in the logs, make the 'logs' icon the 'dataCross' icon
  const navItems = [
    {
      name: 'Overview',
      link: '/dashboard',
      icon: <MaterialSymbolsHomeOutlineRounded />
    },
    {
      name: 'Sites',
      link: '/sites',
      icon: <MaterialSymbolsComputerOutlineRounded />
    },
    {
      name: 'Site Builder',
      link: '/site-builder',
      icon: <MaterialSymbolsBuildOutlineRounded />
    },
    {
      name: 'Analytics',
      link: '/analytics',
      icon: <MaterialSymbolsAnalyticsOutlineRounded />
    },
    {
      name: 'Logs',
      link: '/logs',
      icon: <MaterialSymbolsDataCheck />
    },
    {
      name: 'separator'
    },
    {
      name: 'Support',
      link: '/support',
      icon: <MaterialSymbolsChatOutlineRounded />
    }
  ];

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
    <section
      className="
					min-w-48 min-h-screen px-2 flex flex-col gap-y-10 text-white font-poppins border-r border-black-50
				"
    >
      <div className="py-5 pl-2">
        <h1 className="text-2xl font-bold font-kanit">Draggle</h1>
      </div>

      {/**  TODO: move into separate components */}
      <nav className="font-poppins h-full flex flex-col justify-between">
        <ul className="flex flex-col gap-y-1">
          <span className="text-[0.65rem] uppercase text-white/50 mx-2 mb-2">
            Menu
          </span>

          {/* <div className="w-auto h-px bg-black-50 mt-1 mx-2 mb-2" /> */}

          {navItems.map((item, index) =>
            item.name === 'separator' ? (
              <div
                key={`${item.name}-${index}`}
                className="w-auto h-px bg-black-50 my-3 mx-2"
              />
            ) : (
              <motion.li
                key={item.name}
                className={`flex items-center border-2 hover:bg-black-50 border-transparent duration-300 pl-2 pr-4 h-8 rounded-lg hover:cursor-pointer
                ${
                  pathname === item.link
                    ? 'bg-electric-violet-600 transition-colors !duration-1000 border-2 !border-electric-violet-300 animate-shimmer bg-[linear-gradient(110deg,#6725F2,45%,#8A5DDE,55%,#6725F2)] bg-[length:200%_100%]'
                    : 'text-white/80'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={item.link}>
                  <div
                    className={`flex items-center gap-x-2 font-kanit leading-loose`}
                  >
                    <div className="size-4">{item.icon}</div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                </Link>
              </motion.li>
            )
          )}
        </ul>
        <div className="pl-2 pr-4">
          {/** User profile */}
          <Link href="/settings">
            <div className="flex items-center gap-x-2 font-kanit leading-loose text-white/80">
              <div className="size-4">
                <MaterialSymbolsSettingsOutlineRounded />
              </div>
              <span className="text-sm">Settings</span>
            </div>
          </Link>
          <Link
            href="/profile"
            className="my-2 flex items-center gap-x-2 py-3 rounded-lg"
          >
            <div className="size-4">
              <MaterialSymbolsPerson2OutlineRounded />
            </div>
            <span className="text-xs truncate">{user?.email}</span>
          </Link>
        </div>
      </nav>
    </section>
  );
}
