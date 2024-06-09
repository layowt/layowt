import { User } from "@supabase/supabase-js";

export default function AccountItem({
  user
}: { 
  user: User
}) {
  return ( 
    <button className="flex gap-x-4 px-2 py-1 items-center hover:bg-black-50 duration-300 w-full rounded">
      <div className="bg-electric-violet px-2.5 py-1 rounded-full flex justify-center items-center text-[10px]">
        {user?.email ? user?.email.charAt(0).toUpperCase() : '🔄'}
      </div>
      <div className="flex flex-col gap-y-1 items-start">
        <span className="text-[10px]">Logged in as:</span>
        <span className="text-[15px]">{user?.email}</span>
      </div>
    </button>
  )
}