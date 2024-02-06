'use server';
// stripe imports
import { loadStripe } from '@stripe/stripe-js';

export default async function PricingModalWrapper() {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );
}
