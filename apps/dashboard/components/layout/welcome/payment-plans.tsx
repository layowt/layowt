import { useQuery } from '@tanstack/react-query';
import { getStripeProducts } from '@layowt/utils/src/get-products';
import Stripe from 'stripe';

export default function WelcomePagePaymentPlans({
  products
}: {
  products: Stripe.Product[];
}){
  console.log(products)

  return (
    <>

    </>
  )
}