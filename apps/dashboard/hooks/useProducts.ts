import { useQuery } from '@tanstack/react-query';
import { getStripeProductsBillingperiod } from '@layowt/utils/src/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['get-products'],
    queryFn: getStripeProductsBillingperiod
  })
}