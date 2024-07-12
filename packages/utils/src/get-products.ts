
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

interface StripeProductReturnType {
  products: {
    monthly: Stripe.Product[];
    yearly: Stripe.Product[];
  }
}

/**
 * Method for fetching all of the products from stripe
 * 
 * @returns 
 */
export const getStripeProducts = async (): Promise<StripeProductReturnType> => {
  if (!stripe) return Promise.reject('Stripe is not available');

  // Fetch the monthly prices
  const monthlyPrices: Stripe.Response<Stripe.ApiList<Stripe.Price>> = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
    recurring: { 
      interval: 'month'
    }
  });

  if (!monthlyPrices) throw new Error('No monthly prices found');

  // Fetch the yearly prices
  const yearlyPrices: Stripe.Response<Stripe.ApiList<Stripe.Price>> = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
    recurring: { 
      interval: 'year'
    }
  });

  if (!yearlyPrices) throw new Error('No yearly prices found');

  // Extract the products from the prices
  const monthlyProducts = monthlyPrices.data.map(price => price.product) as Stripe.Product[];
  const yearlyProducts = yearlyPrices.data.map(price => price.product) as Stripe.Product[];

  // Match prices to the products for monthly
  monthlyPrices.data.forEach(price => {
    const product = monthlyProducts.find(product => product.id === price.product.id);
    if (product) {
      product.default_price = price;
    }
  });

  // Match prices to the products for yearly
  yearlyPrices.data.forEach(price => {
    const product = yearlyProducts.find(product => product.id === price.product.id);
    if (product) {
      product.default_price = price;
    }
  });

  // Sort the products by price for both monthly and yearly
  monthlyProducts.sort((productA, productB) => {
    if (!productA.default_price || !productB.default_price) return 0;
    return productA.default_price.unit_amount - productB.default_price.unit_amount;
  });

  yearlyProducts.sort((productA, productB) => {
    if (!productA.default_price || !productB.default_price) return 0;
    return productA.default_price.unit_amount - productB.default_price.unit_amount;
  });

  return {
    monthly: monthlyProducts,
    yearly: yearlyProducts
  }
};
