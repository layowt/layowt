import Stripe from 'stripe';

export const lookupCustomer = async (
  email: string,
  stripe: Stripe
): Promise<Stripe.Customer | null> => {
  try {
    const existingCustomer: Stripe.Response<Stripe.ApiList<Stripe.Customer>> =
      await stripe.customers.list({
        email: email,
        limit: 1
      });
    if (existingCustomer.data.length) {
      return existingCustomer.data[0];
    }

    return null;
  } catch (error) {
    console.error(error);

    return Promise.reject(error);
  }
};

export const createCustomer = async (
  customerParams: Stripe.CustomerCreateParams,
  stripe: Stripe
): Promise<Stripe.Customer> => {
  try {
    return await stripe.customers.create(customerParams);
  } catch (error) {
    return Promise.reject(error);
  }
};
