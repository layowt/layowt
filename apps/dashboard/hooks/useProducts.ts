import { useQuery } from '@tanstack/react-query';
import { getStripeProducts } from '@layowt/utils/src/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['get-products'],
    queryFn: getStripeProducts
  })
}