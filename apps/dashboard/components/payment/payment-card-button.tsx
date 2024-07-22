'use client';
// component imports
import { Button } from '@layowt/components/src/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@layowt/components/src/ui/dialog';
import { CheckoutForm } from './checkout-form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

// method imports
import { createSubscription } from '@/actions/stripe/stripe';
// React imports
import { useState } from 'react';
//type imports
import type { StripeProduct } from '../../types/StripeProduct';

// stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// methods
export const getClientSecret = async (
  product: StripeProduct
): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {

  // passing the whole product the backend.
  const response = await createSubscription(product);
  if (!response || !response.invoice) return null;
  
  return response;
};

export function PaymentButton({ product }: { product: StripeProduct }) {
  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({});

  let clientSecret;

  const handleClientSecret = async (plan: StripeProduct) => {
    // set the loading state for the specific product
    setLoading((prevLoading) => ({
      ...prevLoading,
      [plan.id]: true
    }));

    // Create a new subscription
    try {
      const response = await getClientSecret(plan);

      if (!response) return;

      // set the client secret from the response from our endpoint
      clientSecret = response.invoice;
    } catch (error) {
      console.error(error);

      toast.error('An error occurred while trying to create the subscription');
    }

    // reset the loading state for the specific product
    setLoading((prevLoading) => ({
      ...prevLoading,
      [plan.id]: false
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={async () => await handleClientSecret(product)}
          className="flex gap-x-2 min-w-[84px] duration-300 ease-in-out "
          variant={product.metadata.mostPopular ? 'secondary' : 'default'}
        >
          {loading[product.id] ? (
            <ReloadIcon className="w-3 h-3 animate-spin" />
          ) : (
            'Buy now'
          )}
        </Button>
      </DialogTrigger>
      {clientSecret ? (
        <DialogContent showCloseButton={true}>
          <Elements
            stripe={stripe}
            options={{ clientSecret }}
          >
            <CheckoutForm productPrice={product.default_price.unit_amount} />
          </Elements>
        </DialogContent>
      ) : (
        ''
      )}
    </Dialog>
  );
}
