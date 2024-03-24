'use client';
// component imports
import { PricingCard } from '@/components/payment/payment-card';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

// fonts
import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['latin'] });
// action imports
import { StripeProducts } from '@/utils/stripe/stripe-products';
// type imports
import { StripeProduct } from '@/types/StripeProduct';

import Stripe from 'stripe';

// redux imports
//import { useAppDispatch, useAppSelector } from '@/lib/hooks';
//import { increment, decrement, incrementByAmount } from '@/store/user-store';

// component
export default function PricingPage() {
  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);
  const [loading, setLoading] = useState(true);

  //const dispatch = useAppDispatch();
  //const count = useAppSelector((state) => state.user.count);
  //const user = useAppSelector((state) => state.user);
  const [billingPeriod, setBillingPeriod] =
    useState<Stripe.PriceListParams.Recurring.Interval>('month');

  const setProductsFunc = async (
    billingPeriod: Stripe.PriceListParams.Recurring.Interval = 'month'
  ) => {
    setLoading(true);
    // TODO: fix this
    // @ts-ignore
    setProducts(await StripeProducts(billingPeriod));
    setLoading(false);
  };

  // useEffect to fetch the products on mount (This may need to be changed)
  useEffect(() => {
    setProductsFunc();
    console.log('hello!');
  }, []);

  // a use effect to update the products when the billing period changes
  useEffect(() => {
    setProductsFunc(billingPeriod);
  }, [billingPeriod]);

  let pricingPlansGrid = 'grid w-full gap-x-8';

  return (
    <>
      <div className="flex flex-col h-full gap-y-10 text-white py-20">
        <div className="flex flex-col gap-y-6 w-full items-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-transparent border-none py-1 px-3 text-xs font-poppins"
          >
            Pricing
          </HoverBorderGradient>
          <div className="flex flex-col gap-y-3">
            <h3 className="font-poppins text-5xl font-bold text-center">
              Plans that grow with <br /> your business
            </h3>
            <h4 className="font-poppins text-sm text-center text-white/60">
              Design, build, deploy and analyse your digital product all from
              one application.
            </h4>
          </div>
          <div className="font-kanit flex gap-x-2 items-center">
            Monthly
            <Switch
              onCheckedChange={(checked) => {
                setBillingPeriod(checked ? 'year' : 'month');
              }}
            />
            Annual
          </div>
        </div>
        <div className="flex gap-x-10 items-center justify-center self-center">
          <div
            className={
              pricingPlansGrid + ` grid-cols-${products?.products.length}`
            }
          >
            {products?.products.map((product: StripeProduct) => (
              <PricingCard
                key={product.id}
                product={product}
                isLoading={loading}
                billingPeriod={billingPeriod}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
