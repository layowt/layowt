'use client';
// utils
import { getQueryParams } from "~/packages/utils/src/get-query-params";
// components
import Welcome from "@/components/layout/welcome/welcome";
import WelcomePageDetails from "@/components/layout/welcome/details";
import WelcomePageWrapper from '@/components/layout/welcome/welcome-wrapper'

export default function WelcomePageClient() {
  const queryParams = getQueryParams({
    keys: ['onboarding']
  });

  // if no query params exist, redirect to the welcome page
  // to start the onboarding flow again
  // if (!queryParams.onboarding) {
  //   return <Welcome />
  // }

  return (
    <>
      <WelcomePageWrapper>
        {queryParams.onboarding === 'details' && (
          <WelcomePageDetails />
        )}
        {queryParams.onboarding === 'payment-plans' && (
          'payment plans page'
        )}
      </WelcomePageWrapper>
    </>
  );
}
