import { m as motion } from 'framer-motion';
import Back  from '@layowt/components/src/back';
import { Button } from '@layowt/components/src/ui/button';
import Link from 'next/link';
import { StripeProductReturnType } from '@layowt/utils/src/get-products';
import { Separator } from '@layowt/components/src/ui/separator';

interface WelcomePagePaymentPlansProps extends StripeProductReturnType {
  updateHash: (newHash: string) => void;
}

export default function WelcomePagePaymentPlans({ 
  products,
  updateHash,
}: WelcomePagePaymentPlansProps) {
  if (typeof window === 'undefined') console.log('server')

  return (
    <div className="px-10">
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
      <form 
        className="grid grid-cols-12 gap-4 w-96 mt-8"
      >
        <span className="col-span-12">
          {products.monthly.map((product) => (
            <>
            </>
            // <div key={product.id} className="flex flex-col gap-y-2">
            //   <h3 className="text-lg font-semibold text-white/80">{product.name}</h3>
            //   <p className="text-sm text-white/50">{product.description}</p>
            // </div>
          ))}
        </span>
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
  )
}