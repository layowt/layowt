import Stripe from 'stripe';
import { unstable_cache } from 'next/cache';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export interface StripeProductReturnType {
  products: {
    monthly: Stripe.Product[];
    yearly: Stripe.Product[];
  }
}

/**
 * Method to retrieve all of the products from stripe.
 * 
 * Not to be confused with getStripeProductsBillingperiod,
 * which retrieves the products and their prices and groups
 * them by billing period.
 */
export const getStripeProducts = unstable_cache(
  async (): Promise<Stripe.Product[]> => {
    if (!stripe) {
      throw new Error('Stripe is not initialized');
    };

    const products: Stripe.Response<Stripe.ApiList<Stripe.Product>> = await stripe.products.list({
      active: true,
      limit: 10
    });

    if (!products) throw new Error('No products found');

    return products.data;
  }
)

/**
 * Method for fetching all of the products from stripe
 * 
 * @returns StripeProductReturnType
 */
export const getStripeProductsBillingperiod = unstable_cache(
  async (): Promise<StripeProductReturnType> => {
    if (!stripe) {
      throw new Error('Stripe is not initialized');
    };

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
      // @ts-ignore - TODO: Fix this
      const product = monthlyProducts.find(product => product.id === price.product.id);
      if (product) {
        product.default_price = price;
      }
    });

    // Match prices to the products for yearly
    yearlyPrices.data.forEach(price => {
      // @ts-ignore - TODO: Fix this
      const product = yearlyProducts.find(product => product.id === price.product.id);
      if (product) {
        product.default_price = price;
      }
    });

    // Sort the products by price for both monthly and yearly
    monthlyProducts.sort((productA, productB) => {
      if (!productA.default_price || !productB.default_price) return 0;
      // @ts-ignore - TODO: Fix this
      return productA.default_price.unit_amount - productB.default_price.unit_amount;
    });

    yearlyProducts.sort((productA, productB) => {
      if (!productA.default_price || !productB.default_price) return 0;
      // @ts-ignore - TODO: Fix this
      return productA.default_price.unit_amount - productB.default_price.unit_amount;
    });

    return {
      products: {
        monthly: monthlyProducts,
        yearly: yearlyProducts
      }
    }
  }
);

/**
 * Method for getting the next plan from the users current
 * plan.
 * 
 * @param currentPlan 
 * @param currentBillingCycle - 'monthly' | 'yearly'
 * 
 * @returns Stripe.Product
 */
export const getNextPlan = async(
  currentPlan: Stripe.Product,
  currentBillingCycle: 'monthly' | 'yearly' 
) => {
  // get all of the products
  const { products } = await getStripeProductsBillingperiod();
  if(!products) throw new Error('No products found');

  // get the plans with the same billing cycle
  const billingCyclePlans = currentBillingCycle === 'monthly' ? products.monthly : products.yearly;
  if(!billingCyclePlans) throw new Error('No plans found');

  // get the current plan index
  const currentPlanIndex = billingCyclePlans.findIndex(plan => plan.id === currentPlan.id);
  if(currentPlanIndex === -1) throw new Error('Current plan not found');

  // get the next plan
  const nextPlan = billingCyclePlans[currentPlanIndex + 1];
  if(!nextPlan) throw new Error('No next plan found');

  return nextPlan;
}

/**
 * Method to get a plan via it's id
 * @param planId 
 */
export const getPlanById = async (
  planId: string
) => { 
  // grab all of the products, doesn't matter if it's monthly or yearly
  const products = await getStripeProducts();
  if(!products) throw new Error('No products found');

  // find the plan
  const plan = products.find(product => product.id === planId);
  if (!plan) throw new Error('Plan not found');
  
  return plan;
} 