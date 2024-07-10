'use client';
// react imports
import { m as motion, LazyMotion, domAnimation } from 'framer-motion';

// component imports
import { PricingCard } from '@/components/payment/payment-card';
import { ButtonGroup } from '@/components/ui/button-group';
import { HoverBorderGradient } from '@layowt/components/src/ui/hover-border-gradient';

// redux imports
import { billingPeriod } from '@/store/slices/user-store';
import { useAppSelector } from '@/utils/index';

// action imports
import { getStripeProducts } from '@layowt/utils/src/get-products';

import { useQuery } from '@tanstack/react-query';

// component
export default function PricingPage() {
  const currentBillingPeriod = useAppSelector(billingPeriod);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { products } = await getStripeProducts(currentBillingPeriod);
      return products;
    }
  })

  console.log(products)

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
    <LazyMotion features={domAnimation}>
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
              Pricing
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
            <div className="mt-5 bg-electric-violet-900 rounded-2xl p-1 border border-white/20">
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
              pricingPlansGrid + ` grid-cols-${products?.length}`
            }
          >
            {products?.map((product, index) => (
              <motion.div
                key={product.id}
                className="min-h-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard
                  key={product.id}
                  product={product}
                  isLoading={isLoading}
                  billingPeriod={currentBillingPeriod}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
