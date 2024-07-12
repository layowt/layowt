import WelcomePageClient from "./page.client";

export default async function WelcomePage(){
  return (
    <div className="text-white font-satoshi flex flex-col gap-y-7 min-h-full w-full bg-black-300 bg-dot-white/[0.2] relative items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <WelcomePageClient />
    </div>
  )
}