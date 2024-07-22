import Back from '@layowt/components/src/back';
import { useHashContext } from './welcome-wrapper-context';
import { m as motion } from "framer-motion";
import { CheckoutForm } from '@/components/payment/checkout-form';

// stripe schenanigans
import { loadStripe } from '@stripe/stripe-js';
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from '@stripe/react-stripe-js';
import { createSubscription } from '@/actions/stripe/stripe';
import { useSubscriptions } from '@/hooks/use-subscription';
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function WelcomePagePaymentClient(){
  const { planContext, setHash } = useHashContext();

  const { data: clientSecret } = useSubscriptions(planContext);

  return (
    <div className="px-10 flex flex-col gap-y-4">
      <Back 
        onClick={() => setHash('#details')}
        className="absolute top-4 left-4" 
      />
      <div className="flex flex-col gap-y-2">
        <motion.h1
          className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {planContext.name} Plan Payment:
        </motion.h1>
        <motion.p
          className="text-xs text-center font-satoshi"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
        >
          Please enter your payment details to continue
        </motion.p>
      </div>
      
      {/* <Elements 
        stripe={stripe} 
        options={{ clientSecret }}
      >
        <CheckoutForm productPrice={planContext.default_price?.unit_amount || 0} />
      </Elements> */}
    </div>
  )
}