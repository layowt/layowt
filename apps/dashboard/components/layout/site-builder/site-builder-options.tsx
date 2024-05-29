'use client'

import { GearIcon, LayoutIcon, FileIcon } from "@radix-ui/react-icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip';

import { cn, useAppDispatch, useAppSelector } from "@/utils/index";
import { currentSection, setCurrentSection, type SectionState } from '@/store/slices/website-store'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from "react";

export default function SiteBuilderOptions() {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSelectedSection = useAppSelector(currentSection);

  const handleButtonClick = useCallback(
    (section: SectionState) => {
      dispatch(setCurrentSection(section))
      router.replace(pathname + '?' + createQueryString('s', section))
    },
    [dispatch]
  )

  // on mount set the current section
  useEffect(() => {
    const section = searchParams.get('s') as SectionState

    if (section) {
      dispatch(setCurrentSection(section))
      return;
    }
    router.push(pathname + '?' + createQueryString('s', currentSelectedSection))
  }, [])

  const items = [
    {
      name: 'pages',
      icon: <FileIcon className="size-4" />,
      toolTip: 'Pages',
      onClick: () =>  handleButtonClick('pages')
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
  ]

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      {/* <div 
        className="flex h-full relative" 
        style={{ top: 'calc(50% - 73px)' }}
        >
        <div 
          className="
          px-2 py-4 w-11 border border-l-0 border-black-50 flex flex-col 
          gap-y-3 rounded-tr-lg rounded-br-lg h-fit
          "
          >
          {items.map((item, index) => (
            <button 
            key={index} 
            className="flex justify-center items-center w-full p-1 rounded-lg"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div> */}
      <div 
        className="flex h-full"
      >
        <div 
          className="px-2 py-4 w-12 border-r border-black-50 flex flex-col gap-y-3"
        >
          {items.map((item, index) => (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    key={index} 
                    className={cn(
                      'flex justify-center items-center w-full px-1 py-2 rounded-lg',
                      currentSelectedSection === item.name ? 'bg-black-50' : ''
                    )}
                    onClick={item.onClick}
                  >
                    {item.icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent  side="right" className="bg-black-75 border border-black-50 z-[100]">
                  {item.toolTip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </>
  )
}
