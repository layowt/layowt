'use client'
import { GearIcon, LayoutIcon, FileIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip';

import { cn, useAppDispatch, useAppSelector } from "@/utils/index";
import { currentSection, setCurrentSection, type SectionState } from '@/store/slices/website-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryParams, useCreateQueryString } from '@/hooks/useQueryParams';

export default function SiteBuilderOptions() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSelectedSection = useAppSelector(currentSection);
  
  const createQueryString = useCreateQueryString();

  const handleButtonClick = useQueryParams({
    name: 's'
  }, (section: SectionState) => {
    dispatch(setCurrentSection(section));
  });

  // on mount set the current section
  useEffect(() => {
    const section = searchParams.get('s') as SectionState;

    if (section) {
      dispatch(setCurrentSection(section));
      return;
    }
    //router.push(pathname + '?' + createQueryString('s', 'pages'));
  }, [dispatch, router, pathname]);

  const items = [
    {
      name: 'insert',
      icon: <PlusIcon className="size-4" />,
      toolTip: 'Insert',
      onClick: () => handleButtonClick('insert')
    },
    {
      name: 'pages',
      icon: <FileIcon className="size-4" />,
      toolTip: 'Pages',
      onClick: () => handleButtonClick('pages')
    },
    {
      name: 'layout',
      icon: <LayoutIcon className="size-4" />,
      toolTip: 'Layout',
      onClick: () => handleButtonClick('layout')
    },
    {
      name: 'settings',
      icon: <GearIcon className="size-4" />,
      toolTip: 'Settings',
      onClick: () => handleButtonClick('settings')
    }
  ];

  return (
    <>
      <div className="flex h-full">
        <div className="px-2 py-4 w-12 border-r border-black-50 flex flex-col gap-y-3">
          {items.map((item, index) => (
            <TooltipProvider key={index} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      'flex justify-center items-center w-full px-1 py-2 rounded-md',
                      currentSelectedSection === item.name ? 'bg-black-50' : ''
                    )}
                    onClick={item.onClick}
                  >
                    {item.icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black-75 border border-black-50 z-[100]">
                  {item.toolTip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </>
  );
}
