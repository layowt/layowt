'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NavigationItem({
  index,
  opts: { name, link, icon, expanded, nested }
}: {
  index: number;
  opts: {
    name: string;
    link?: string;
    icon?: React.ReactNode;
    expanded?: boolean;
    nested?: { name: string; link: string; icon: React.ReactNode }[];
  };
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div key={index}>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Link
          href={link}
          className={`flex items-center justify-between border-2 hover:bg-black-75 border-transparent duration-300 px-2 h-8 rounded hover:cursor-pointer
				${
          pathname === link
            ? 'bg-electric-violet-600 transition-colors !duration-3000 border-2 !border-electric-violet-300 animate-shimmer bg-[linear-gradient(110deg,#6725F2,45%,#8A5DDE,55%,#6725F2)] bg-[length:200%_100%]'
            : 'text-white/80'
        }`}
        >
          <div className="flex gap-x-2 items-center">
            <div className="size-3">{icon}</div>
            <span className="text-base">{name}</span>
          </div>
          {nested && nested.length && (
            <button
              className="flex items-center justify-center size-4"
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 transform transition-transform ${
                  isExpanded ? '-rotate-90' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )}
        </Link>
      </motion.div>
      {isExpanded && (
        <motion.ul
          className="flex flex-col gap-y-1 mt-1"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {nested.map((nestedItem, index) => (
            <Link
              href={nestedItem.link}
              key={nestedItem.name}
            >
              <motion.li
                className={`flex items-center border-2 hover:bg-black-75 border-transparent duration-300 pl-2 pr-4 h-8 rounded hover:cursor-pointer group truncate
								${
                  pathname === nestedItem.link
                    ? 'bg-electric-violet-600 transition-colors !duration-3000 border-2 !border-electric-violet-300 animate-shimmer bg-[linear-gradient(110deg,#6725F2,45%,#8A5DDE,55%,#6725F2)] bg-[length:200%_100%]'
                    : 'text-white/80'
                }`}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`flex items-center font-kanit leading-loose justify-between w-full`}
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="size-3 opacity-0 group-hover:opacity-100 duration-100">
                      {nestedItem.icon}
                    </div>
                    <span className="text-xs">{nestedItem.name}</span>
                  </div>
                </div>
              </motion.li>
            </Link>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
