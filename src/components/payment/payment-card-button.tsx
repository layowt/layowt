'use client';
// component imports
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/src/components/ui/dialog';
import { CheckoutForm } from '@/src/components/payment/checkout-form';
import { ReloadIcon } from '@radix-ui/react-icons';

// method imports
import { createSubscription } from '@/src/app/actions/stripe';

// React imports
import { useState } from 'react';

//type imports
import type { StripeProduct } from '@/src/types/StripeProduct';

// stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// methods
const getClientSecret = async (
  planType: string
): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  const response = await createSubscription('logan@hiyield.co.uk', planType); // TODO: Change hardcoded email

  if (!response) return null;

  const { invoice } = response;

  if (!invoice) return null;

  return response;
};

export function PaymentButton({ product }: { product: StripeProduct }) {
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
    </>
  );
}
