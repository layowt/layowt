import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export const StripeProducts = async (
  billingPeriod: Stripe.PriceListParams.Recurring.Interval = 'month'
): Promise<Record<
  'products',
  Stripe.Product[]
> | null> => {
  if (!stripe) return Promise.reject('Stripe is not available');

  let products: Stripe.Response<Stripe.ApiList<Stripe.Product>> =
    await stripe.products.list({
      active: true,
      limit: 10
    });
    
  if (!products) return Promise.reject('No products found');

  // now we have the product ids, lets fetch the prices as there can be multiple
  // billing periods for each product
  const prices: Stripe.Response<Stripe.ApiList<Stripe.Price>> = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
    recurring: {
      interval: billingPeriod
    }
  });

  // loop over all of the prices and match them to the product
  prices.data.forEach((price) => {
    // @ts-expect-error - the product object is expanded
    const priceProductId = price.product.id

    // find the product that matches the price
    const product = products.data.find((product) => product.id === priceProductId);

    // if we can't find the product, then we can't match the price
    if(!product) return;

    // match the price to the product
    product.default_price = price
  })

  // once we have the products, lets sort them via the price
  products.data.sort((productA, productB) => {
    if (!productA.default_price || !productB.default_price) return 0;
    return (
      // @ts-ignore - we know that this is a field as we expand it in the list
      productA.default_price.unit_amount - productB.default_price.unit_amount
    );
  });

  return {
    products: products.data
  };
};
