import Stripe from 'stripe';
import { createInvoice } from './utils/stripe-invoice';
import { lookupCustomer, createCustomer } from './utils/stripe-customer';
import { StripeProducts } from './stripe-products';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export const createSubscription = async (
  userEmail: string,
  planUid: string
): Promise<any> => {
  let currentUser: Stripe.Customer | null = null;

  const planTypes = await StripeProducts().then((response) => {
    if (!response) return null;

    console.log(response.products);

    return response.products;
  });

  const currentPlan = planTypes?.find((plan) => plan.id === planUid);

  // try to find the customer via the email
  const isExistingCustomer = await lookupCustomer(userEmail, stripe);

  if (isExistingCustomer) {
    currentUser = isExistingCustomer;
  }

  if (!isExistingCustomer) {
    const newCustomerParams: Stripe.CustomerCreateParams = {
      email: userEmail
    };

    try {
      currentUser = await createCustomer(newCustomerParams, stripe);

      if (!currentUser) return null;
    } catch (error) {
      console.error(error);
    }
  }

  if (!currentPlan || !currentUser) return null;

  const invoice = await createInvoice(
    currentUser,
    currentPlan.default_price.unit_amount ?? '0',
    stripe
  );

  console.log(invoice);

  return {
    invoice,
    paymentPrice: currentPlan.default_price.unit_amount
  };
};
