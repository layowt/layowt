'use client';
import { Button } from '@/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip';
import Breadcrumbs from '@/components/layout/dashboard/breadcrumbs';
import { Toggle } from '@/ui/toggle';

import UserDropdownMenu from '@/components/modals/user-dropdown-menu';

import { MagnifyingGlassIcon, BellIcon } from '@radix-ui/react-icons';

import { useState } from 'react';
import useKeyboard from '@/hooks/useKeyboard';
import { motion } from 'framer-motion';
import WebsiteSwitcher from './website-switcher';

export default function DashboardNavBar({
  children
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // open the command dialog when the user presses '⌘ + k'
  useKeyboard('k', () => setOpen(true));

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-16 border-b border-black-50">
          <div className="flex justify-center items-center size-full relative">
            {/* <Breadcrumbs className="absolute left-4 text-xs font-poppins font-bold" /> */}
            <motion.div
              className="h-full relative flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                className="
                  flex justify-start items-center border border-black-50 rounded-lg w-64 h-3/4 py-1.5 
                  pl-6 font-poppins hover:text-white text-white/60 group text-[0.65rem] bg-black-75
                "
                variant="none"
                onClick={() => setOpen(!open)}
                rounded="default"
              >
                <MagnifyingGlassIcon className="absolute left-2 size-3" />
                <span>Search</span>
                <p className="text-sm text-muted-foreground">
                  <kbd
                    className="
                   bg-black-50 pointer-events-none inline-flex h-4 select-none items-center gap-[2px] rounded border px-1 text-[10px] font-medium   
                   opacity-100 !border-none absolute right-1.5 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:!text-white
                  "
                  >
                    <span>⌘</span>k
                  </kbd>
                </p>
              </Button>
            </motion.div>
            <div className="flex items-center gap-x-2.5 text-white/60 absolute right-2">
              <Toggle
                className="
                  hover:bg-black-50 duration-300 rounded-lg size-7 flex items-center justify-center
                  data-[state=on]:bg-black-50 data-[state=on]:text-white/80
                "
                size="sm"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className="size-3.5"
                    >
                      <BellIcon />
                    </TooltipTrigger>
                    <TooltipContent className="text-[0.55rem] m-2 bg-black-75 text-white border border-black font-poppins">
                      <p>Up to date!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Toggle>
              <WebsiteSwitcher />
            </div>
          </div>
          {/** Entry point for page */}
          <div className="container py-5">{children}</div>
        </div>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..." />
      </CommandDialog>
    </>
  );
}
