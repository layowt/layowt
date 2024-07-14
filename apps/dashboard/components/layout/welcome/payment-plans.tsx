import { m as motion } from 'framer-motion';
import Link from 'next/link';
import { StripeProductReturnType } from '@layowt/utils/src/get-products';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

interface WelcomePagePaymentPlansProps extends StripeProductReturnType {
  updateHash: (newHash: string) => void;
}

export default function WelcomePagePaymentPlans({ 
  products,
  updateHash,
}: WelcomePagePaymentPlansProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(products.monthly[0].id);
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<'monthly' | 'year'>('monthly');

  const selectedPlan = useMemo(
    () => products[selectedBillingPeriod].find(plan => plan.id === selectedPlanId),
    [selectedPlanId, selectedBillingPeriod, products]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('server');
    }
  }, []);

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
        <Separator color='offWhite' className="col-span-full" />
        <div className="col-span-full lg:col-span-7">
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
        <div className="col-span-full lg:col-span-5">
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
        <div className="col-span-full">
          {selectedPlan?.id}
          {selectedBillingPeriod}
        </div>
      </form>

      <div className="col-span-12 flex flex-col gap-y-2 text-center">
        <Button
          variant="default"
          onClick={(e) => {
            e.preventDefault();
            updateHash('#payment-plans');
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
