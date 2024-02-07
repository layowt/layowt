import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

export const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button>Submit</Button>
    </form>
  );
};
