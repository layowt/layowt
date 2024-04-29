import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  Share2Icon,
  EyeOpenIcon,
  QuestionMarkCircledIcon
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import type { websites as Website } from '@prisma/client';

export default function SiteBuilderPublishModal({
  website
}: {
  website: Website;
}) {
  const dropdownOptions = [
    {
      name: 'Preview',
      icon: (
        <EyeOpenIcon
          width="auto"
          height="auto"
        />
      )
    },
    {
      name: 'Share',
      icon: (
        <Share2Icon
          width="auto"
          height="auto"
        />
      )
    },
    {
      name: 'separator'
    },
    {
      name: 'Get Support',
      icon: (
        <QuestionMarkCircledIcon
          width="auto"
          height="auto"
        />
      )
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          className="!rounded-bl-none !rounded-tl-none group-hover:!bg-white group-hover:text-black px-2"
          rounded="sm"
          size="sm"
          hoverEffect={false}
        >
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-inter border border-black-50 !bg-black-75 text-white/80 m-1"
        side="bottom"
        align="end"
      >
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DropdownMenuLabel className="text-base font-normal">
            {website?.websiteName}
          </DropdownMenuLabel>
        </motion.div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
          {dropdownOptions.map((item, index) => (
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
									px-2 py-1 hover:border-none focus:!ring-0 hover:!ring-0 hover:bg-black-50 rounded w-full"
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
