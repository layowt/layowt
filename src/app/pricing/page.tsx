'use client';
// react imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// component imports
import { PricingCard } from '@/components/payment/payment-card';
import { ButtonGroup } from '@/components/ui/button-group';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

// redux imports
import { billingPeriod } from '@/store/user-store';
import { useAppSelector } from '@/lib/hooks';

// action imports
import { StripeProducts } from '@/utils/stripe/stripe-products';

// stripe imports
import Stripe from 'stripe';
import { StripeProduct } from '@/types/StripeProduct';

// component
export default function PricingPage() {
  const currentBillingPeriod = useAppSelector(billingPeriod);

  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  // a use effect to update the products when the billing period changes
  useEffect(() => {
    setProductsFunc(currentBillingPeriod);
  }, [currentBillingPeriod]);

  let pricingPlansGrid = 'grid w-full gap-x-8';

  const tabs: {
    title: string;
    value: 'month' | 'year';
  }[] = [
    {
      title: 'Monthly',
      value: 'month'
    },
    {
      title: 'Yearly',
      value: 'year'
    }
  ];

  return (
    <>
      <div className="flex flex-col h-full gap-y-10 text-white py-20">
        <div className="flex flex-col gap-y-6 w-full items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex gap-x-2 items-center"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-transparent border-none py-1 px-2.5 text-xs font-poppins"
            >
              Pricing:
            </HoverBorderGradient>
          </motion.div>
          <div className="flex flex-col gap-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-poppins text-5xl font-bold text-center">
                Plans that grow with <br /> your business
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h4 className="font-poppins text-sm text-center text-white/60">
                {/* Design, build, deploy and analyse your digital product all from
              one application. */}
                Select from a range of payment plans to best suit your
                businesses needs.
              </h4>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="mt-5 bg-black-100 rounded-2xl p-1 border border-white/10">
              <ButtonGroup
                tabs={tabs}
                tabClassName="[&>span]:!text-white py-2 px-12"
                activeTabClassName="bg-electric-violet-500 !text-white border border-electric-violet-300 rounded-xl"
              />
            </div>
          </motion.div>
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
                billingPeriod={currentBillingPeriod}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
