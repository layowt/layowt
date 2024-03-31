'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// icon imports
import MaterialSymbolsHomeOutlineRounded from '@/ui/icons/home';
import MaterialSymbolsBuildOutlineRounded from '@/ui/icons/build';
import MaterialSymbolsSettingsOutlineRounded from '@/ui/icons/settings';
import { Button } from '@/ui/button';
import {
  ActivityLogIcon,
  BarChartIcon,
  ChatBubbleIcon,
  DesktopIcon,
  ExitIcon
} from '@radix-ui/react-icons';
import Image from 'next/image';

export default function DashboardSidebar() {
  const pathname = usePathname();

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
    <section
      className="
					min-w-40 min-h-screen px-2 flex flex-col gap-y-10 text-white font-poppins border-r border-black-50
				"
    >
      <Link
        href="/dashboard"
        className="py-5 pl-2 flex gap-x-1 items-center hover:cursor-pointer group"
      >
        <Image
          src="/favicon.ico"
          width={20}
          height={20}
          alt="Draggle logo"
        />
        <h1 className="font-bold font-poppins group-hover:text-white/60 duration-300">
          Draggle
        </h1>
      </Link>

      {/**  TODO: move into separate components */}
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
          {/** User profile */}
          {/* <Link
            href="/profile"
            className="my-2 flex items-center gap-x-2 py-3 rounded-lg"
          >
            <div className="size-4">
              <MaterialSymbolsPerson2OutlineRounded />
            </div>
            <span className="text-xs truncate">{user?.email}</span>
          </Link> */}
          <Button
            className="
              flex justify-start font-normal gap-x-2 items-center hover:!text-white text-white/80 hover:!scale-100
              border-2 hover:bg-black-50 border-transparent duration-300 pl-2 pr-4 h-8 rounded-lg hover:cursor-pointer
            "
            variant="none"
          >
            <ExitIcon className="size-4" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>
    </section>
  );
}
