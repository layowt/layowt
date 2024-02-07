import { Button } from '@/components/ui/button';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent the default form submission
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href
      }
    });

    // TODO: handle the result

    return result;
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe}
      >
        Submit
      </Button>
    </form>
  );
};
