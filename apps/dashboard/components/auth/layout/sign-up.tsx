'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client";
import { use } from "react";

export default function SignupNavigation(){
  const supabase = createClient();
  const pathname = usePathname();

  const { data: user } = use(supabase.auth.getUser())

  return (
    <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
      <span>Already building?</span>
      <Link
        href={user?.user?.id ? '/dashboard' : '/login'}
        className="
          cursor-pointer bg-electric-violet hover:bg-electric-violet-600 
          duration-300 px-4 py-2 rounded-sm shadow-md shadow-electric-violet-700
        "
        prefetch
      >
        Login
      </Link>
    </div>
  )
}