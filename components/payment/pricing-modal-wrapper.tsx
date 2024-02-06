'use client';
// React imports
import { useState } from 'react';

// firebase imports
import { auth } from '@/lib/firebase-config';

// component imports
import { Button } from '@/components/ui/button';

export default function PricingModal() {
  return (
    <>
      <form
        className="w-full text-white flex flex-col items-center gap-y-10 h-screen place-content-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Button className="w-fit">Hit server</Button>
      </form>
    </>
  );
}
