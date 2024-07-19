'use client';
import WelcomePageDetails from '@/components/layout/welcome/details';
import { HashProvider, useHash } from '@/components/layout/welcome/welcome-wrapper';
import WelcomePagePaymentPlans from '@/components/layout/welcome/payment-plans';
import WelcomePagePayment from '@/components/layout/welcome/payment';
import { useHash as useHashHook } from '@/hooks/useHash';

import type { StripeProductReturnType } from '@layowt/utils/src/get-products';

export default function WelcomePageClient({ products }: StripeProductReturnType) {
  let { hash } = useHash();
  hash = useHashHook();

  return (
    <HashProvider>
      {hash === '#details' && <WelcomePageDetails />}
      {hash === '#payment-plans' && (
        <WelcomePagePaymentPlans products={products} />
      )}
      {hash === '#payment' && <WelcomePagePayment />}
    </HashProvider>
  );
}
