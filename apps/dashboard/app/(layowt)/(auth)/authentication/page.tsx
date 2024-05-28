import AuthenticationCard from "@/components/auth/authentication";

export default function Page(){
  return (
    <div className="h-screen flex flex-col gap-y-6 justify-center items-center text-white">
      <AuthenticationCard />
    </div>
  )
}