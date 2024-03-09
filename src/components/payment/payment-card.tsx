import Stripe from 'stripe';
// component imports
import { PaymentButton } from '@/components/payment/payment-card-button';
import { ReloadIcon } from '@radix-ui/react-icons';

//type imports
import type { StripeProduct } from '@/types/StripeProduct';

// fonts
import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['latin'] });

export function PricingCard({
  product,
  isLoading,
  billingPeriod
}: {
  product: StripeProduct;
  isLoading: boolean;
  billingPeriod: Stripe.PriceListParams.Recurring.Interval;
}) {
  return (
    <>
      <div
        key={product.id}
        className="
				flex flex-col gap-y-12 border border-white p-8 pt-10
				max-w-72 justify-between relative
			"
      >
        <div className="flex flex-col justify-between h-full gap-y-8">
          <div className="flex flex-col gap-y-6">
            <div className={cairo.className + ` flex flex-col gap-y-2 w-full`}>
              {product.metadata.mostPopular ? (
                <span
                  className="
							text-white text-xs font-bold absolute top-0 right-0
							py-1.5 px-3 bg-pink rounded-bl-[0.5rem]
							"
                >
                  Most popular
                </span>
              ) : (
                ''
              )}
              <div className="flex flex-col gap-y-1">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <p className="text-xs">{product.description}</p>
              </div>
            </div>
            <div className="flex gap-x-1 items-center">
              <div className="flex gap-x-1 items-center">
                £
                {isLoading ? (
                  <div className="">
                    <ReloadIcon className="w-3 h-3 animate-spin" />
                  </div>
                ) : (
                  <span className={`text-3xl`}>
                    {product.default_price?.unit_amount / 100}
                  </span>
                )}
              </div>
              <span className="text-xs mt-2">/ {billingPeriod}</span>
            </div>
            {/** Feature list */}
            <div className="flex flex-col gap-y-2">
              {product.features.map((feature) => (
                <div
                  key={product.id + feature.name}
                  className="flex gap-x-2 text-xs"
                >
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/** payment trigger */}
          <PaymentButton
            product={product}
            key={product.id}
          />
        </div>
      </div>
    </>
  );
}
