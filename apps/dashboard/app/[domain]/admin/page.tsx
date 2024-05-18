import LoginForm from "@/components/auth/login-form";

/**
 * If the user has landed here, rediect them to the 'login' page with a
 * query parameter of 'redirect' with the site id they were trying to access
 */
export default function AdminPage(){
  return (
    <div className="flex flex-col gap-y-4 h-screen items-center justify-center text-white px-10">
      <LoginForm />
    </div>  
  )
}