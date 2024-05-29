import { GearIcon, LayoutIcon, FileIcon } from "@radix-ui/react-icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip';

export default function SiteBuilderOptions() {
  const items = [
    {
      icon: <FileIcon className="size-4" />,
      toolTip: 'Pages'
    },
    {
      icon: <LayoutIcon className="size-4" />,
      toolTip: 'Layout'
    },  
    {
      icon: <GearIcon className="size-4" />,
      toolTip: 'Settings'
    }
  ]

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
          className="
            px-2 py-4 w-11 border-r border-black-50 flex flex-col 
            gap-y-3
          "
        >
          {items.map((item, index) => (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    key={index} 
                    className="flex justify-center items-center w-full p-1 rounded-lg"
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
  )
}
