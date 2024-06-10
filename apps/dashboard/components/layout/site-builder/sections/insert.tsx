import { FileIcon } from "lucide-react"
import Text from "../components/text"
import DateComponent from "../components/date"

export default function Insert(){
  const insertItems = [
    {
      name: 'pages',
      icon: <FileIcon className="size-4" />,
    },
    {
      name: 'sections',
      icon: <FileIcon className="size-4" />,
    },
    {
      name: 'components',
      icon: <FileIcon className="size-4" />,
    }
  ]

  return (
    <div className="flex flex-col gap-y-5 overflow-y-scroll">
      <div className="text-heading-xl"> 
        Insert
      </div>
      <Text />
      <DateComponent />
    </div>
  )
}