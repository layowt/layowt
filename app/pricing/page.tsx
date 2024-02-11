'use client';
// component imports
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PricingCard } from '@/components/payment/payment-card';

import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { ReloadIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { CheckoutForm } from '@/components/payment/checkout-form';
import { Cairo } from 'next/font/google';

// fonts
const cairo = Cairo({ subsets: ['latin'] });

// action imports
import { createSubscription } from '@/app/actions/stripe';
import { StripeProducts } from '@/app/actions/stripe-products';

// stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// type imports
import { StripeProduct } from '@/types/StripeProduct';

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

// component
export default function PricingPage() {
  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [clientSecret, setClientSecret] = useState('');

  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);

  // TODO: his needs to take in the plan UID and user email
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

  // Promise<Record<"products", Stripe.Product[]> | null>
  // SetStateAction<Record<"products", StripeProduct[]> | null>

  useEffect(() => {
    const setProductsFunc = async () => {
      // TODO: fix this
      // @ts-ignore
      setProducts(await StripeProducts());

      console.log(await StripeProducts());
    };

    setProductsFunc();
  }, []);

  const options = {
    clientSecret: clientSecret
  };

  let pricingPlansGrid = 'grid w-fit gap-x-8';

  return (
    <>
      <Layout>
        <div className="flex flex-col h-full gap-y-20 text-white py-20">
          <div className="flex flex-col gap-y-6 w-full">
            <h6 className="text-xs">Pricing</h6>
            <h1 className={cairo.className + ` text-5xl font-bold`}>
              Plans available
            </h1>
          </div>

          <div className="flex gap-x-10 items-center">
            <div
              className={
                pricingPlansGrid + ` grid-cols-${products?.products.length}`
              }
            >
              {/** TODO: Extract the card into its own component */}
              {products?.products.map((product: StripeProduct) => (
                <div
                  key={product.id}
                  className="
                  flex flex-col gap-y-12 border border-white
                  p-8 pt-10 max-w-72 justify-between relative
                "
                >
                  <div className="flex flex-col gap-y-4">
                    <div
                      className={
                        cairo.className + ` flex flex-col gap-y-2 w-full`
                      }
                    >
                      {product.metadata.mostPopular ? (
                        <span
                          className="
                          text-white text-xs font-bold absolute top-0 right-0 py-1.5 px-3
                          bg-pink rounded-bl-lg
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
                    <div className="flex flex-col gap-y-2">
                      {product.features.map((feature) => (
                        <div
                          key={product.id + feature.name}
                          className="flex gap-x-2 text-xs"
                        >
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={async () =>
                          await handleClientSecret(product.id)
                        }
                        className={
                          product.metadata.mostPopular
                            ? 'bg-pink hover:bg-pink/75'
                            : '' +
                              ` flex gap-x-2 min-w-[84px] duration-300 ease-in-out`
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
              ))}
            </div>

            <ArrowRightIcon className="w-5 h-5" />
          </div>

          {/** Placeholder purchase button */}
        </div>
      </Layout>
    </>
  );
}
