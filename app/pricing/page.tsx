'use client';
// component imports
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { CheckoutForm } from '@/components/payment/checkout-form';

// action imports
import { createSubscription } from '@/app/actions/stripe';

// stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// methods
const getClientSecret = async (): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  const response: {
    invoice: string;
    paymentPrice: number;
  } = await createSubscription('logan@hiyield.co.uk', 'single');

  const { invoice, paymentPrice } = response;

  if (!invoice) return null;

  return invoice;
};

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// component
export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [stripeElements, setStripeElements] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  // TODO: his needs to take in the plan UID and user email
  const handleClientSecret = async () => {
    // set the loading state
    setLoading(true);
    // Create a new subscription
    try {
      const response = await getClientSecret();

      if (!response) return;

      setClientSecret(response);
    } catch (error) {
      console.error(error);
    }

    // reset the loading state
    setLoading(false);
  };

  const options = {
    clientSecret: clientSecret
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

          {clientSecret}

          {clientSecret ? (
            <Elements
              stripe={stripe}
              options={options}
            >
              <CheckoutForm />
            </Elements>
          ) : (
            ''
          )}

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
