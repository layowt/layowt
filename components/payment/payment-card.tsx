// component imports
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

//type imports
import type { StripeProduct } from '@/types/StripeProduct';
import { createSubscription } from '@/app/actions/stripe';

import { CheckoutForm } from '@/components/payment/checkout-form';

// stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// fonts
import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['latin'] });

// methods
const getClientSecret = async (
  planType: string
): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  const response: {
    invoice: string;
    paymentPrice: number;
  } = await createSubscription('logan@hiyield.co.uk', planType);

  const { invoice } = response;

  if (!invoice) return null;

  return response;
};

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export function PricingCard({ product }: { product: StripeProduct }) {
  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [clientSecret, setClientSecret] = useState('');

  const handleClientSecret = async (planUid: string) => {
    // set the loading state for the specific product
    setLoading((prevLoading) => ({
      ...prevLoading,
      [planUid]: true
    }));

    // Create a new subscription
    try {
      const response = await getClientSecret(planUid);

      if (!response) return;

      // set the client secret from the response from our endpoint
      setClientSecret(response.invoice);
    } catch (error) {
      console.error(error);

      // TODO: Show Sonner here on error
    }

    // reset the loading state for the specific product
    setLoading((prevLoading) => ({
      ...prevLoading,
      [planUid]: false
    }));
  };

  const options = {
    clientSecret: clientSecret
  };

  return (
    <>
      <div
        key={product.id}
        className="
				flex flex-col gap-y-12 border border-white p-8 pt-10
				max-w-72 justify-between relative
			"
      >
        <div className="flex flex-col gap-y-4">
          <div className={cairo.className + ` flex flex-col gap-y-2 w-full`}>
            {product.metadata.mostPopular ? (
              <span
                className="
							text-white text-xs font-bold absolute top-0 right-0
							py-1.5 px-3 bg-pink rounded-bl-lg
							"
              >
                Most popular
              </span>
            ) : (
              ''
            )}
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-xs">{product.description}</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="flex gap-x-1 items-center">
              £
              <span className={`text-3xl`}>
                {product.default_price?.unit_amount
                  ? product.default_price?.unit_amount / 100
                  : 'Free'}
              </span>
            </div>
            <span className="text-xs mt-2">/ month</span>
          </div>

          {/** Feature list */}
          {product.features.map((feature) => (
            <div
              key={product.id + feature.name}
              className="flex gap-x-2 text-xs"
            >
              <span>{feature.name}</span>
            </div>
          ))}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={async () => await handleClientSecret(product.id)}
                className={
                  product.metadata.mostPopular
                    ? 'bg-pink hover:bg-pink/75'
                    : '' + ` flex gap-x-2 min-w-[84px] duration-300 ease-in-out`
                }
              >
                {loading[product.id] ? (
                  <ReloadIcon className="w-3 h-3 animate-spin" />
                ) : (
                  'Buy now'
                )}
              </Button>
            </DialogTrigger>
            {clientSecret ? (
              <DialogContent>
                <Elements
                  stripe={stripe}
                  options={options}
                >
                  <CheckoutForm />
                </Elements>
              </DialogContent>
            ) : (
              ''
            )}
          </Dialog>
        </div>
      </div>
    </>
  );
}
