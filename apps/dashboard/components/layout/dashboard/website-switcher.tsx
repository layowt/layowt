import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import getClientUser from '@/utils/user/user-client-session';
import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';
import { ReloadIcon } from '@radix-ui/react-icons';
import UserDropdownMenu from '@/components/modals/user-dropdown-menu';
import useUserWebsites from '@/hooks/useUserWebsites';
import type { websites } from '@prisma/client';
import { User } from '@supabase/supabase-js';

export default function WebsiteSwitcher() {
  const currentWebsite = useAppSelector(website);
  const [user, setUser] = useState<User | null>(null);
  const userWebsites = useUserWebsites<websites[]>(user?.id ?? '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getClientUser();
        setUser(user.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData(); // Fetch user data on initial render
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (userWebsites.length === 1 || currentWebsite === null) {
    return <UserDropdownMenu />;
  }

  return (
    <DropdownMenu>
      {/** This will display the current site the user is on */}
      <DropdownMenuTrigger asChild>
        <button className="bg-electric-violet text-xs px-3 py-1.5 rounded-lg border border-black-50">
          {currentWebsite?.websiteName ? (
            currentWebsite?.websiteName
          ) : (
            <ReloadIcon className="size-2 my-1 animate-spin" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Render dropdown menu items based on userWebsites */}
        {userWebsites.map((website) => (
          <div key={website.websiteId}>{website.websiteName}</div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
