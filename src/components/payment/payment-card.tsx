import Stripe from 'stripe';
// component imports
import { PaymentButton } from '@/components/payment/payment-card-button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { IonSparkles } from '@/components/ui/icons/sparkle';

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
				flex flex-col gap-y- bg-black-100 p-8
				w-80 justify-between relative rounded-xl
			"
      >
        <div className="flex flex-col justify-between h-full gap-y-8">
          <div className="flex flex-col gap-y-6">
            <div className={cairo.className + ` flex flex-col gap-y-2 w-full`}>
              <div className="flex flex-col gap-y-1 border-b border-electric-violet-50 pb-6">
                <div className="flex w-full justify-between items-center">
                  <h2 className="text-xl font-semibold font-poppins">
                    {product.name}
                  </h2>
                  {product.metadata.mostPopular ? (
                    <span
                      className="
                      text-white text-[0.5rem] font-bold h-min
                      py-1 px-2 border border-electric-violet-500 rounded-md
                      font-poppins flex gap-x-1 items-center
                      "
                    >
                      <IonSparkles className="size-2 text-yellow-400" />
                      Recommended
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex gap-x-1 items-center">
                  <div className="flex gap-x-1 items-center">
                    £
                    {isLoading ? (
                      <div className="">
                        <ReloadIcon className="w-3 h-3 animate-spin" />
                      </div>
                    ) : (
                      <span className="text-3xl font-kanit">
                        {product.default_price?.unit_amount
                          ? product.default_price.unit_amount / 100
                          : 0}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-2">/ {billingPeriod}</span>
                </div>
                <p className="text-xs font-kanit">{product.description}</p>
              </div>
            </div>
            {/** Feature list */}
            <div className="flex flex-col gap-y-2 font-poppins">
              {product.features.map((feature) => (
                <div
                  key={product.id + feature.name}
                  className="flex gap-x-2 text-xs"
                >
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
            {/** payment trigger */}
            <PaymentButton
              product={product}
              key={product.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
