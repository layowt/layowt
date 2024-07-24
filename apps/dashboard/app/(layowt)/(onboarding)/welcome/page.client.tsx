'use client';
import { useEffect, useState } from 'react';
import { useHash } from '@/hooks/useHash';
// components
import WelcomePageDetails from '@/components/layout/welcome/details';
import WelcomePageWrapper from '@/components/layout/welcome/welcome-wrapper';
import WelcomePagePaymentPlans from "@/components/layout/welcome/payment-plans";
import type { StripeProductReturnType } from '@layowt/utils/src/get-products';

export default function WelcomePageClient({
  products
}: StripeProductReturnType) {
  const hash = useHash();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    setCurrentHash(hash);
  }, [hash]);

  useEffect(() => {
    if (currentHash === '') {
      updateHash('#details');
    }
  }, []);

  const updateHash = (newHash: string) => {
    window.location.hash = newHash;
    setCurrentHash(newHash);
  };

  console.log(products);

  return (
    <WelcomePageWrapper>
      {currentHash === '#details' && (
        <WelcomePageDetails updateHash={updateHash} />
      )}
      {currentHash === '#payment-plans' && (
        <WelcomePagePaymentPlans products={products} updateHash={updateHash} />
      )}
    </WelcomePageWrapper>
  );
}
