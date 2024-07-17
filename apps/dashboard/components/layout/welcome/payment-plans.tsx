import { m as motion } from 'framer-motion';
import Link from 'next/link';
import { StripeProductReturnType } from '@layowt/utils/src/get-products';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StripeProduct } from '@/types/StripeProduct';

// components
import Back from '@layowt/components/src/back';
import { Button } from '@layowt/components/src/ui/button';
import { Separator } from '@layowt/components/src/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectTrigger, 
  SelectItem, 
  SelectLabel,
  SelectGroup,
  SelectValue
} from '@layowt/components/src/ui/select';
import { CheckIcon } from '@radix-ui/react-icons';

interface WelcomePagePaymentPlansProps extends StripeProductReturnType {
  updateHash: (newHash: string) => void;
}

export default function WelcomePagePaymentPlans({ 
  products,
  updateHash,
}: WelcomePagePaymentPlansProps) {
  const router  = useRouter();

  // if no plans are present at this stage, just redirect the user to the dashboard
  if (!products) {
    router.push('/dashboard?q=new-user');
  }

  const [selectedPlanId, setSelectedPlanId] = useState(products.monthly[0].id);
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<'monthly' | 'year'>('monthly');
  
  const selectedPlan = useMemo<StripeProduct>(
    () => products[selectedBillingPeriod].find(plan => plan.id === selectedPlanId),
    [selectedPlanId, selectedBillingPeriod, products]
  );

  return (
    <div className="px-10 flex flex-col gap-y-4">
      <Back 
        onClick={() => updateHash('#details')}
        className="absolute top-4 left-4" 
      />
      <div className="flex flex-col gap-y-2">
        <motion.h1
          className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          Payment plans
        </motion.h1>
        <motion.p
          className="text-xs text-center font-satoshi"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
        >
          Choose from a wide range of flexible payment plans to suit your needs.
        </motion.p>
      </div>
      <form className="grid grid-cols-12 gap-4 w-96">
        <Separator color="offWhite" className="col-span-full" />
        <div className="col-span-full lg:col-span-8">
          <Select 
            value={selectedPlanId} 
            onValueChange={(value) => setSelectedPlanId(value)}
          >
            <SelectTrigger className="bg-black-100 border border-black-300 font-satoshi">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent className="bg-black-100 text-white border border-black-300 font-satoshi">
              <SelectGroup>
                {products.monthly.map((product) => (
                  <SelectItem 
                    key={product.id}
                    value={product.id} 
                    className="flex items-center hover:bg-black-50"
                  >
                    {product.name}
                  </SelectItem>  
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full lg:col-span-4">
          <Select 
            value={selectedBillingPeriod} 
            onValueChange={(value) => setSelectedBillingPeriod(value as 'monthly' | 'year')}
          >
            <SelectTrigger className="bg-black-100 border border-black-300 font-satoshi">
              <SelectValue placeholder="Select billing period" />
            </SelectTrigger>
            <SelectContent className="bg-black-100 text-white border border-black-300 font-satoshi">
              <SelectGroup>
                <SelectItem value="monthly" className="flex items-center hover:bg-black-50">
                  Monthly
                </SelectItem>
                <SelectItem value="yearly" className="flex items-center hover:bg-black-50">
                  Yearly
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/** Features */}
        <div className="col-span-full flex flex-col justify-between">
          <div>
            {selectedPlan.features.map((feature, index) => (
              <div
                key={index + feature.name}
                className="flex gap-x-2 items-center font-satoshi"
              >
                <div className="flex items-center justify-center bg-electric-violet-500 rounded-full size-3">
                  <CheckIcon className="size-3 text-white" />
                </div>
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 font-satoshi">
            £
            <span className="text-3xl">
              {selectedPlan.default_price.unit_amount / 100}
            </span>
            /
            <span className="text-sm">
              {selectedBillingPeriod === 'monthly' ? 'month' : 'year'}
            </span>
          </div>
        </div>
      </form>

      <div className="col-span-12 flex flex-col gap-y-2 text-center">
        <Button
          variant="default"
          onClick={(e) => {
            e.preventDefault();
            updateHash('#payment');
          }}
        >
          Continue
        </Button>
        {/** Send to dashboard with new-user param */}
        <Link
          href="/dashboard?q=new-user"
          className="text-xs text-white/50 hover:underline"
          prefetch={true}
        >
          Skip for now
        </Link>
      </div>
    </div>
  );
}
