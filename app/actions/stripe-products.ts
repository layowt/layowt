import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export const StripeProducts = async (): Promise<Record<
  'products',
  Stripe.Product[]
> | null> => {
  if (!stripe) return Promise.reject('Stripe is not available');

  const products: Stripe.Response<Stripe.ApiList<Stripe.Product>> =
    await stripe.products.list({
      active: true,
      limit: 10,
      expand: ['data.default_price']
    });

  if (!products) return Promise.reject('No products found');

  return {
    products: products.data
  };
};
