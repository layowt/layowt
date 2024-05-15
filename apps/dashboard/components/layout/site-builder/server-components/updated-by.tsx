import { getLastUpdatedUser } from "@/utils/websites"
import { use } from "react"

async function getUser(websiteId: string){
  return await getLastUpdatedUser(websiteId)
}

export default function UpdatedBy({ websiteId }: { websiteId: string }){
  const { email } = use(getUser(websiteId))

  return (
    <>
      By 
    </>
  )
}