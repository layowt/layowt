'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// icon imports
import MaterialSymbolsHomeOutlineRounded from '@/ui/icons/home';
import MaterialSymbolsBuildOutlineRounded from '@/ui/icons/build';
import MaterialSymbolsSettingsOutlineRounded from '@/ui/icons/settings';
import {
  ActivityLogIcon,
  BarChartIcon,
  ChatBubbleIcon,
  DesktopIcon
} from '@radix-ui/react-icons';

export default function NavigationItems() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Overview',
      link: '/dashboard',
      icon: <MaterialSymbolsHomeOutlineRounded />
    },
    {
      name: 'Sites',
      link: '/sites',
      icon: <DesktopIcon />
    },
    {
      name: 'Site Builder',
      link: '/site-builder',
      icon: <MaterialSymbolsBuildOutlineRounded />
    },
    {
      name: 'Analytics',
      link: '/analytics',
      icon: <BarChartIcon />
    },
    {
      name: 'Logs',
      link: '/logs',
      icon: <ActivityLogIcon />
    },
    {
      name: 'separator'
    },
    {
      name: 'Support',
      link: '/support',
      icon: <ChatBubbleIcon />
    }
  ];

  return (
    <nav className="font-poppins h-full flex flex-col justify-between">
      <ul className="flex flex-col gap-y-1">
        <motion.span
          className="text-[0.5rem] uppercase text-white/50 mx-2 mb-2"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Menu
        </motion.span>
        {navItems.map((item, index) =>
          item.name === 'separator' ? (
            <div
              key={`${item.name}-${index}`}
              className="w-auto h-px bg-black-50 my-3 mx-2"
            />
          ) : (
            <motion.li
              key={item.name}
              className={`flex items-center border-2 hover:bg-black-50 border-transparent duration-300 pl-2 pr-4 h-7 rounded-lg hover:cursor-pointer
                ${
                  pathname === item.link
                    ? 'bg-electric-violet-600 transition-colors !duration-3000 border-2 !border-electric-violet-300 animate-shimmer bg-[linear-gradient(110deg,#6725F2,45%,#8A5DDE,55%,#6725F2)] bg-[length:200%_100%]'
                    : 'text-white/80'
                }`}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={item.link}>
                <div
                  className={`flex items-center gap-x-2 font-kanit leading-loose`}
                >
                  <div className="size-3">{item.icon}</div>
                  <span className="text-xs">{item.name}</span>
                </div>
              </Link>
            </motion.li>
          )
        )}
      </ul>
      <div className="flex flex-col gap-y-1 py-3">
        <Link
          href="/settings"
          className="flex items-center border-2 hover:bg-black-50 border-transparent duration-300 pl-2 pr-4 h-8 rounded-lg hover:cursor-pointer"
        >
          <div className="flex items-center gap-x-2 font-kanit leading-loose text-white/80">
            <div className="size-4">
              <MaterialSymbolsSettingsOutlineRounded />
            </div>
            <span className="text-sm">Settings</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
