import { GearIcon, LayoutIcon, FileIcon } from "@radix-ui/react-icons"

export default function SiteBuilderOptions() {
  const items = [
    {
      icon: <FileIcon className="size-4" />,
    },
    {
      icon: <LayoutIcon className="size-4" />,
    },  
    {
      icon: <GearIcon className="size-4" />,
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
            <button 
              key={index} 
              className="flex justify-center items-center w-full p-1 rounded-lg"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
