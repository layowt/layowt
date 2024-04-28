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
  EyeOpenIcon
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
          <DropdownMenuLabel className="text-xs font-semibold">
            {website?.websiteName}
          </DropdownMenuLabel>
        </motion.div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
          {dropdownOptions.map((item, index) => (
            <motion.li
              key={index}
              className="list-none w-full"
            >
              <button
                key={index}
                className="
									px-2 py-1 hover:border-none hover:!ring-0 hover:bg-black-50 rounded w-full"
              >
                <div className="flex items-center gap-x-2">
                  <div className="size-3">{item.icon}</div>
                  <span className="text-[0.65rem]">{item.name}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}