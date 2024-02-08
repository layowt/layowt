'use client';
// component imports
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { CheckoutForm } from '@/components/payment/checkout-form';

// action imports
import { createSubscription } from '@/app/actions/stripe';
import { StripeProducts } from '@/app/actions/stripe-products';

// stripe imports
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// type imports
import { StripeProduct } from '@/types/StripeProduct';

// methods
const getClientSecret = async (): Promise<{
  invoice: string;
} | null> => {
  const response: {
    invoice: string;
    paymentPrice: number;
  } = await createSubscription('logan@hiyield.co.uk', 'single');

  const { invoice } = response;

  if (!invoice) return null;

  return response;
};

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// component
export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);

  // TODO: his needs to take in the plan UID and user email
  const handleClientSecret = async () => {
    // set the loading state
    setLoading(true);
    // Create a new subscription
    try {
      const response = await getClientSecret();

      if (!response) return;

      // set the client secret from the response from our endpoint
      setClientSecret(response.invoice);
    } catch (error) {
      console.error(error);

      // TODO: Show Sonner here on error
    }

    // reset the loading state
    setLoading(false);
  };

  // Promise<Record<"products", Stripe.Product[]> | null>
  // SetStateAction<Record<"products", StripeProduct[]> | null>

  useEffect(() => {
    const setProductsFunc = async () => {
      // TODO: FIX
      setProducts(await StripeProducts());
    };

    setProductsFunc();
  }, []);

  const options = {
    clientSecret: clientSecret
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col h-full justify-center items-center gap-y-10 text-white py-10">
          <div className="flex flex-col gap-y-2 justify-center items-center">
            <h6 className="bg-gray-900 px-4 py-2 rounded-xl text-xs w-fit">
              Pricing
            </h6>
            <h1 className="text-5xl font-bold">Plans Available</h1>
          </div>

          {products?.products.map((product: StripeProduct) => (
            <div
              key={product.id}
              className="flex flex-col gap-y-4"
            >
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-lg">{product.description}</p>
              <div className="flex gap-x-2">
                {product.default_price?.unit_amount
                  ? product.default_price?.unit_amount / 100
                  : 'Free'}
              </div>
            </div>
          ))}

          <Dialog>
            <DialogTrigger asChild>
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

          {/** Placeholder purchase button */}
        </div>
      </Layout>
    </>
  );
}
