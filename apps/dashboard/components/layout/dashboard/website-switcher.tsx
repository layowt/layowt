// react
import React, { useState, useEffect } from 'react';

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { ReloadIcon, SunIcon } from '@radix-ui/react-icons';
import IcRoundLogOut from '@/components/ui/icons/logout';
import IcOutlineDarkMode from '@/components/ui/icons/darkmode';
import IcSharpHelpOutline from '@/components/ui/icons/help';
import UserDropdownMenu from '@/components/modals/user-dropdown-menu';

// redux
import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';

// hooks
import useUserWebsites from '@/hooks/useUserWebsites';
import useCurrentTheme from '@/hooks/useCurrentTheme';

// misc
import { createClient } from '@/utils/supabase/client';
import getClientUser from '@/utils/user/user-client-session';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';

export default function WebsiteSwitcher() {
  const supabase = createClient();
  const currentWebsite = useAppSelector(website);
  const [user, setUser] = useState<User>(null);
  const userWebsites = useUserWebsites(user?.id ?? '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getClientUser();
        setUser(user.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const { theme, toggleTheme } = useCurrentTheme();

  /**
   * SITES
   * -----
   * SETTINGS (NOT DIRECTLY USER SETTINGS)
   * -----
   * OPTION TO UPGRADE PLAN (IF THE USER IS NOT ON THE HIGHEST PLAN)
   * -----
   * USER SETTINGS
   */
  interface DropdownItem {
    name: string;
    icon?: any;
    onClick?: () => void;
    html?: any;
  }

  const dropdownItems: DropdownItem[] = [
    {
      name: 'separator'
    },
    {
      name: 'Feedback',
      icon: <IcSharpHelpOutline />
    },
    // TODO: change to a toggle
    {
      name: 'Theme',
      html: (
        <button
          onClick={() => toggleTheme()}
          className="px-2 py-1 hover:bg-black-50 rounded w-full flex justify-start text-sm"
        >
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-x-2">
              {theme === 'dark' ? (
                <SunIcon className="size-6" />
              ) : (
                <IcOutlineDarkMode className="size-6" />
              )}
              <span>Theme</span>
            </div>
            <Switch
              checked={theme === 'light'}
              className="w-8 h-4 !bg-black-50"
              thumbClasses="
                size-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:bg-electric-violet
                data-[state=unchecked]:translate-x-0.5
              "
            />
          </div>
        </button>
      )
    },
    {
      name: 'Feedback'
    },
    {
      name: 'Support'
    },
    {
      name: 'separator'
    },
    {
      name: 'Account Settings',
      html: (
        <button className="flex gap-x-2 px-2 py-1 items-center hover:bg-black-50 duration-300 w-full rounded">
          <div className="bg-electric-violet px-2.5 py-1 rounded-full flex justify-center items-center text-[10px]">
            {user?.email ? user?.email.charAt(0).toUpperCase() : '🔄'}
          </div>
          <div className="flex flex-col gap-y-1 items-start">
            <span className="text-[10px]">Logged in as:</span>
            <span className="text-[15px]">{user?.email}</span>
          </div>
        </button>
      )
    },
    {
      name: 'Upgrade to pro'
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

  if (!user || userWebsites === null) {
    return <ReloadIcon className="size-2 my-1 animate-spin" />;
  }

  if (!currentWebsite) {
    return <UserDropdownMenu />;
  }

  // if we have gotten to the point, the the userWebsites is an array and exists

  // organize the userWebsites so that the current website is at the top
  const currentWebsiteIndex = userWebsites.findIndex(
    (site) => site.websiteId === currentWebsite.websiteId
  );

  // grab all of the data for the current website
  const currentWebsiteObj = userWebsites[currentWebsiteIndex];

  // remove the current website from the userWebsites array
  userWebsites.splice(currentWebsiteIndex, 1);

  // add the current website to the top of the userWebsites array
  userWebsites.unshift(currentWebsiteObj);

  // add the userWebsites to the dropdownItems
  dropdownItems.unshift(
    ...userWebsites.map((site) => ({
      name: site.websiteName,
      icon: '',
      onClick: () => {
        console.log('Switching to:', site.websiteName);
      }
    }))
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            bg-electric-violet text-xs px-2 py-1.5 rounded-lg 
            border border-electric-violet font-semibold font-inter
            hover:bg-electric-violet-400 duration-300 text-white
          "
        >
          {currentWebsite?.websiteName ? (
            currentWebsite.websiteName
          ) : (
            <ReloadIcon className="size-2 my-1 animate-spin" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-poppins border border-black-50 !bg-black-75 text-white/80 w-64"
        side="bottom"
        align="end"
      >
        <DropdownMenuGroup className="flex flex-col gap-y-0.5">
          {dropdownItems?.map((item, index) =>
            item.name === 'separator' ? (
              <div
                key={`${item.name}-${index}`}
                className="w-auto h-px bg-black-50 -mx-2 my-2"
              />
            ) : 'html' in item ? (
              <div key={item.name}>{item.html}</div>
            ) : (
              <button
                key={index}
                className={cn(
                  'px-2 py-1 hover:bg-black-50 rounded w-full flex justify-start'
                )}
                onClick={item.onClick}
              >
                <div className="flex items-center gap-x-2">
                  <div className="size-6">{item.icon}</div>
                  <span className="text-sm">{item.name}</span>
                </div>
              </button>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
