'use client';
import WelcomePageDetails from '@/components/layout/welcome/details';
import { useHashContext } from '@/components/layout/welcome/welcome-wrapper';
import WelcomePagePaymentPlans from '@/components/layout/welcome/payment-plans';
import WelcomePagePayment from '@/components/layout/welcome/payment';

import type { StripeProductReturnType } from '@layowt/utils/src/get-products';
import { useEffect } from 'react';

export default function WelcomePageClient({ products }: StripeProductReturnType) {
  const { hash, setHash } = useHashContext();

  useEffect(() => {
    if (hash === '') {
      setHash('#details');
    }
  }, [hash, setHash]);

  return (
    <>
      {hash === '#details' && <WelcomePageDetails />}
      {hash === '#payment-plans' && (
        <WelcomePagePaymentPlans products={products} />
      )}
      {hash === '#payment' && <WelcomePagePayment />}
    </>
  );
}
