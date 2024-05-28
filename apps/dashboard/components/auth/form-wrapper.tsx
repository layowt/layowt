import { cn } from "@/utils/index";

export default function AuthenticationCardWrapper({ 
  children,
  onSubmit,
  className
}: { 
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  className: string
}){
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      className={
        cn('flex flex-col gap-y-8 bg-black-300 border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]', 
        className
      )}
    >
      {children}
    </form>
  )
}