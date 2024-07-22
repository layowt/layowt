'use server'
import Stripe from 'stripe';
import { createInvoice } from './stripe-invoice';
import { lookupCustomer, createCustomer } from './stripe-customer';
import { StripeProduct } from '@/types/StripeProduct';
import { getUserFromSession } from '../user/get-user';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16'
});

export const createSubscription = async (currentPlan: StripeProduct): Promise<{
  invoice: string;
  paymentPrice: number;
} | null> => {
  console.log('Creating subscription for:', currentPlan);
  // get the current user (server side)
  const { data: user } = await getUserFromSession()
  const userEmail = user.user.email;

  if(!currentPlan) throw new Error('No plan provided.')

  let currentUser: Stripe.Customer | null = null;
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
      console.error('Error creating customer', error);
    }
  }
  if (!currentPlan || !currentUser) return null;

  const invoice = await createInvoice(
    currentUser,
    currentPlan.default_price?.unit_amount,
    stripe
  );
  if (!invoice) return null;

  return {
    invoice,
    paymentPrice: currentPlan.default_price.unit_amount
  };
};
