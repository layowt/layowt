import { GearIcon, LayoutIcon } from "@radix-ui/react-icons"

export default function SiteBuilderOptions(){
  const items = [
    {
      icon: <LayoutIcon className="size-4" />,
    },  
    {
      icon: <GearIcon className="size-4" />,
    }
  ]

  return (
    <div className="px-2 py-4 w-12 h-full border-r border-black-50 flex flex-col gap-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex justify-center items-center w-full p-2 rounded-lg">
          {item.icon}
        </div>
      ))}
    </div>
  )
}