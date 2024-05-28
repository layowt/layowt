import { usePathname } from "next/navigation"
import Link from "next/link"

export default function SignupNavigation(){
  const pathname = usePathname();

  return (
    <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
      <span>Already building?</span>
      <Link
        href="/sign-up"
        className="
          cursor-pointer bg-electric-violet hover:bg-electric-violet-600 
          duration-300 px-4 py-2 rounded-sm shadow-md shadow-electric-violet-700
        "
        prefetch
      >
        Sign Up
      </Link>
    </div>
  )
}