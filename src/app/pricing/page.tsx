'use client';
// component imports
import { PricingCard } from '@/components/payment/payment-card';
import { useState, useEffect, useRef, use } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

// fonts
import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['latin'] });
// action imports
import { StripeProducts } from '@/actions/stripe-products';
// type imports
import { StripeProduct } from '@/types/StripeProduct';

// redux imports
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { increment, decrement, incrementByAmount } from '@/store/user-store';

// component
export default function PricingPage() {
  const [products, setProducts] = useState<Record<
    'products',
    StripeProduct[]
  > | null>(null);

  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.user.count);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const setProductsFunc = async () => {
      // TODO: fix this
      // @ts-ignore
      setProducts(await StripeProducts());
    };

    setProductsFunc();
  }, []);

  let pricingPlansGrid = 'grid w-fit gap-x-8';

  return (
    <>
      <div className="flex flex-col h-full gap-y-20 text-white py-20">
        <div className="flex flex-col gap-y-6 w-full">
          <h6 className="text-xs">Pricing</h6>
          <h1 className={cairo.className + ` text-5xl font-bold`}>
            Plans available
          </h1>
        </div>

        {user?.user?.email}

        <div className="flex flex-col gap-y-2">
          {count?.toString()}
          <div className="flex gap-x-1">
            <Button
              onClick={() => dispatch(increment())}
              className="w-fit"
            >
              increment
            </Button>
            <Button
              onClick={() => dispatch(decrement())}
              className="w-fit"
            >
              decrement
            </Button>
            <Button
              onClick={() => dispatch(incrementByAmount(5))}
              className="w-fit"
            >
              increment by 5
            </Button>
          </div>
        </div>

        <div className="flex gap-x-10 items-center">
          <div
            className={
              pricingPlansGrid + ` grid-cols-${products?.products.length}`
            }
          >
            {products?.products.map((product: StripeProduct) => (
              <PricingCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}
