import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import type { websites as Website } from '@prisma/client';

export default function SiteBuilderPublishModal({
  website
}: {
  website: Website;
}) {
  const dropdownOptions = [
    {
      name: 'Preview'
    },
    {
      name: 'Share'
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
              <button className="text-[0.65rem] font-normal px-2 py-1">
                {item.name}
              </button>
            </motion.li>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
