export default function AuthenticationCardWrapper({ children }: { children: React.ReactNode}){
  return (
    <div className="flex flex-col gap-y-8 bg-black-300 border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]">
      {children}
    </div>
  )
}