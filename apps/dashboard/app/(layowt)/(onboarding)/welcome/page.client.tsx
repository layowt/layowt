'use client';
import Welcome from "@/components/layout/welcome/welcome";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getQueryParams } from "~/packages/utils/src/get-query-params";

export default function WelcomePageClient(){
  const router = useRouter();
  const queryParams = getQueryParams({
    keys: ['onboarding']
  });

  // if no query params exist, redirect to the welcome page
  // to start the onboarding flow again
  if(!queryParams){
    toast.error('No query params found. Redirecting to welcome page.');
    router.push('/welcome');
    return null;
  }

  return (
    <>
      {queryParams.includes(str => str.includes('details')) && (
        <Welcome />
      )}
    </> 
  )
}