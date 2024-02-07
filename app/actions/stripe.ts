import Stripe from 'stripe';
import { createInvoice } from './utils/stripe-invoice';
import { lookupCustomer, createCustomer } from './utils/stripe-customer';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export const createSubscription = async (
  userEmail: string,
  planType: string
): Promise<any> => {
  let currentUser: Stripe.Customer | null = null;
  const planTypes: {
    price: number;
    name: string;
  }[] = [
    {
      name: 'single',
      price: 199
    },
    {
      name: 'monthly',
      price: 499
    },
    {
      name: 'yearly',
      price: 699
    }
  ];

  // first we will check if the user already exists in stripe
  const currentPlanType:
    | {
        price: number;
        name: string;
      }
    | undefined = planTypes.find(
    (plan: { name: string; price: number }): boolean => plan.name === planType
  );

  // try to find the customer via the email
  const isExistingCustomer = await lookupCustomer(userEmail, stripe);

  if (isExistingCustomer) currentUser = isExistingCustomer;

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

  if (!currentPlanType || !currentUser) return null;

  const invoice = await createInvoice(
    currentUser,
    currentPlanType.price,
    stripe
  );

  return {
    invoice,
    paymentPrice: currentPlanType.price
  };
};
