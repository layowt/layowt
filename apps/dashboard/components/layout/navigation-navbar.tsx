'use client';
import { useState, useEffect } from 'react';
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

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function DashboardNavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="w-full h-16 border-b border-black-50">
        <div className="flex justify-center size-full">
          <div className="h-full relative flex items-center">
            <Button
              className="
              flex justify-start items-center border border-black-50 rounded-lg w-64 h-3/5 py-1.5 
             pl-6 text-xs font-poppins hover:text-white text-white/60 group
              "
              variant="none"
              onClick={() => setOpen(!open)}
            >
              <MagnifyingGlassIcon className="absolute left-2 size-3" />
              Search
              <p className="text-sm text-muted-foreground">
                <kbd
                  className="
                   bg-transparent pointer-events-none inline-flex h-5 select-none items-center gap-[2px] rounded border px-1.5 text-[10px] font-medium   
                   opacity-100 !border-none absolute right-1.5 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:!text-white
                  "
                >
                  <span className="text-xs">⌘</span>k
                </kbd>
              </p>
            </Button>
          </div>
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
