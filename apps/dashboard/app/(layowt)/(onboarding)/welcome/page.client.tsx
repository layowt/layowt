'use client';
import WelcomePageDetails from '@/components/layout/welcome/details';
import { useHashContext } from '@/components/layout/welcome/welcome-wrapper-context';
import WelcomePagePaymentPlans from '@/components/layout/welcome/payment-plans';
import WelcomePagePayment from '@/components/layout/welcome/payment';

import type { StripeProductReturnType } from '@layowt/utils/src/products';
import { useEffect } from 'react';

export default function WelcomePageClient({ products }: StripeProductReturnType) {
  const { hash, setHash, userOnboardingDetails } = useHashContext();
  // if no hash is present, set the default hash
  useEffect(() => {
    if (hash === '') {
      setHash('#details');
    }
  }, [hash, setHash]);

  // if the user has refreshed the page after entering their details, we need to 
  // send them back to the details page to enter them
  if (Object.values(userOnboardingDetails).some(value => value === '')) {
    setHash('#details');
  }


  return (
    <div
      className="
        w-min p-8 text-white font-satoshi flex flex-col border border-black-50
        gap-y-7 min-h-full bg-black-300 relative items-center justify-center
        rounded-lg
      "
    >
      {hash === '#details' && <WelcomePageDetails />}
      {hash === '#payment-plans' && (
        <WelcomePagePaymentPlans products={products} />
      )}
      {hash === '#payment' && <WelcomePagePayment />}
    </div>
  );
}
