import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY as string,
  {
    apiVersion: '2023-10-16',
    appInfo: {
      name: 'Stripe Next.js',
      url: process.env.NEXT_PUBLIC_APP_DOMAIN,
    },
  }
);
