'use client';
// component imports
import { PricingCard } from '@/components/payment/payment-card';

import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Cairo } from 'next/font/google';

// fonts
const cairo = Cairo({ subsets: ['latin'] });

// action imports
import { StripeProducts } from '@/app/actions/stripe-products';

// type imports
import { StripeProduct } from '@/types/StripeProduct';

// component
export default function PricingPage() {
  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);

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
                <PricingCard product={product} />
              ))}
            </div>

            <ArrowRightIcon className="w-5 h-5" />
          </div>
        </div>
      </Layout>
    </>
  );
}
