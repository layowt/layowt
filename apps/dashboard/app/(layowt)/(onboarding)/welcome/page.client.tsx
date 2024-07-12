'use client';
import { useEffect, useState } from 'react';
import { useHash } from '@/hooks/useHash';
// components
import WelcomePageDetails from '@/components/layout/welcome/details';
import WelcomePageWrapper from '@/components/layout/welcome/welcome-wrapper';
import WelcomePagePaymentPlans from "@/components/layout/welcome/payment-plans";

export default function WelcomePageClient() {
  const hash = useHash();
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    setCurrentHash(hash);
  }, [hash]);

  const updateHash = (newHash: string) => {
    window.location.hash = newHash;
    setCurrentHash(newHash);
  };

  return (
    <WelcomePageWrapper>
      {
        currentHash === '#details' && (
          <WelcomePageDetails updateHash={updateHash} />
        )
      }
      {currentHash === '#payment-plans' && (
        <WelcomePagePaymentPlans updateHash={updateHash} />
      )}
    </WelcomePageWrapper>
  );
}
