'use client';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { createSubscription } from '@/app/actions/stripe';

const getStuff = async () => {
  console.log('ran');
  const response = await createSubscription('logan@hiyield.co.uk', 'single');
  console.log(await response);
};

export default function PricingPage() {
  const handleClientSecret = async () => {
    // Create a new subscription
    const x = await getStuff();
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-y-10 font-cairo text-white">
          <div className="flex flex-col justify-center items-center">
            <h6 className="bg-gray-900 px-4 py-2 rounded-xl text-xs w-fit">
              Pricing
            </h6>
            <h1 className="text-5xl font-bold">Pricing</h1>
          </div>

          {/** Placeholder purchase button */}
          <Button onClick={handleClientSecret}>Buy now</Button>
        </div>
      </Layout>
    </>
  );
}
