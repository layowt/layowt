import WelcomePageClient from './page.client';
import { getStripeProducts } from '@layowt/utils/src/get-products';
import { HashProvider } from '@/components/layout/welcome/welcome-wrapper';

export default async function WelcomePage(){
  const { products } = await getStripeProducts();

  return (
    <HashProvider>
      <div className="text-white font-satoshi flex flex-col gap-y-7 min-h-full w-full bg-black-300 bg-dot-white/[0.2] relative items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <WelcomePageClient products={products} />
      </div>
    </HashProvider>
  );
}
