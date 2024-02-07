'use client';
// component imports
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

// action imports
import { createSubscription } from '@/app/actions/stripe';

// methods
const getStuff = async () => {
  const response = await createSubscription('logan@hiyield.co.uk', 'single');
};

// component
export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleClientSecret = async () => {
    // set the loading state
    setLoading(true);
    // Create a new subscription
    await getStuff();

    // reset the loading state
    setLoading(false);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col h-full justify-center items-center gap-y-10 font-cairo text-white py-10">
          <div className="flex flex-col gap-y-2 justify-center items-center">
            <h6 className="bg-gray-900 px-4 py-2 rounded-xl text-xs w-fit">
              Pricing
            </h6>
            <h1 className="text-5xl font-bold">Plans Available</h1>
          </div>

          {/** Placeholder purchase button */}
          <Button
            onClick={handleClientSecret}
            className="w-fit flex gap-x-2 min-w-[84px]"
          >
            {loading ? (
              <ReloadIcon className="w-3 h-3 animate-spin" />
            ) : (
              'Buy now'
            )}
          </Button>
        </div>
      </Layout>
    </>
  );
}
