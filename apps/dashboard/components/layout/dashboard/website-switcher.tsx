// react
import { useState, useEffect } from 'react';

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import {
  ReloadIcon,
  GearIcon,
  PersonIcon,
  ChatBubbleIcon,
  DoubleArrowDownIcon,
  ChevronDownIcon
} from '@radix-ui/react-icons';
import IcRoundLogOut from '@/components/ui/icons/logout';
import IcSharpHelpOutline from '@/components/ui/icons/help';
import UserDropdownMenu from '@/components/modals/user-dropdown-menu';

// redux
import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';

// hooks
import useUserWebsites from '@/hooks/useUserWebsites';

// misc
import { createClient } from '@/utils/supabase/client';
import getClientUser from '@/utils/user/user-client-session';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import ThemeSwitcherModal from '@/components/modals/dashboard/theme-switcher';

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
      name: 'Settings',
      icon: (
        <GearIcon
          width="auto"
          height="auto"
        />
      )
    },
    // TODO: change to a toggle
    {
      name: 'Theme',
      html: <ThemeSwitcherModal />
    },
    {
      name: 'Feedback',
      icon: (
        <ChatBubbleIcon
          width="auto"
          height="auto"
        />
      )
    },
    {
      name: 'Support',
      icon: <IcSharpHelpOutline />
    },
    {
      name: 'separator'
    },
    {
      name: 'Account Settings',
      html: (
        <button className="flex gap-x-4 px-2 py-1 items-center hover:bg-black-50 duration-300 w-full rounded">
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
      name: 'Upgrade to pro',
      icon: (
        <PersonIcon
          width="auto"
          height="auto"
        />
      )
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
  dropdownItems.unshift({
    name: currentWebsite.websiteName,
    html: (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger asChild>
          <button className="px-2 py-1 rounded w-full flex items-center justify-between group hover:bg-black-50 duration-300">
            <div className="flex items-center gap-x-2">
              {currentWebsiteObj?.websiteLogo ? (
                <img
                  src={currentWebsiteObj?.websiteLogo}
                  alt="website logo"
                  className="w-8 h-8 rounded-sm object-cover"
                />
              ) : (
                <div className="size-8 bg-electric-violet rounded-sm flex items-center justify-center text-sm">
                  {currentWebsiteObj.websiteName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col gap-y-0.5 items-start">
                <span>{currentWebsite.websiteName}</span>
                <span className="text-[10px]">www.testing.com</span>
              </div>
            </div>

            {userWebsites.length > 1 ? (
              <button className="hover:bg-black-50 p-1 rounded-sm">
                <DoubleArrowDownIcon className="group-hover:rotate-90 duration-300" />
              </button>
            ) : (
              ''
            )}
          </button>
        </DropdownMenuSubTrigger>
        {userWebsites.length > 1 ? (
          <DropdownMenuSubContent
            sideOffset={15}
            className="bg-black-75 border border-black-50 rounded-lg font-inter flex flex-col gap-y-0.5 text-white/80 w-56 p-2"
          >
            {userWebsites.map((site) =>
              site.websiteName === currentWebsite.websiteName ? (
                ''
              ) : (
                <DropdownMenuItem key={site.websiteId}>
                  <Link
                    className="text-xs px-2 py-1.5 rounded w-full flex items-center justify-between hover:bg-black-50 duration-300"
                    href={`/dashboard/${site.websiteId}`}
                  >
                    <div className="flex items-center gap-x-2">
                      <div className="size-8 bg-electric-violet rounded-sm flex items-center justify-center text-sm">
                        {site.websiteName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-y-0.5 items-start">
                        <span>{site.websiteName}</span>
                        {/** TODO: MAKE THIS COME FROM THE DB */}
                        <span className="text-[10px]">www.testing.com</span>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuSubContent>
        ) : (
          ''
        )}
      </DropdownMenuSub>
    )
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            bg-electric-violet text-xs px-4 py-1.5 rounded-lg 
            border border-electric-violet font-semibold font-inter
            hover:bg-electric-violet-400 duration-300 text-white
          "
        >
          {currentWebsite?.websiteName ? (
            <div className="flex gap-x-2 items-center">
              <span>{currentWebsite.websiteName}</span>
              <ChevronDownIcon className="size-3" />
            </div>
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
                className="w-auto h-px bg-black-50 -mx-2 my-1.5"
              />
            ) : 'html' in item ? (
              <div key={item.name}>{item.html}</div>
            ) : (
              <button
                key={index}
                className={cn(
                  'p-2 hover:bg-black-50 rounded w-full flex justify-start'
                )}
                onClick={item.onClick}
              >
                {/** TODO: make the button either a 'link' or 'button' based on what it required */}
                <div className="flex items-center gap-x-4">
                  <div className="size-5">{item.icon}</div>
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
