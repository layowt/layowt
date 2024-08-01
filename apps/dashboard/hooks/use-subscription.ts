import { useQuery } from '@tanstack/react-query';
import { createSubscription } from '@/actions/stripe/stripe';
import { useEffect } from 'react';

export const useSubscriptions = (plan) => {
  console.log('hello from use-subscriptions')

  const foo = useQuery({
    queryKey: ['make-subscription'],
    queryFn: () => createSubscription(plan)
  })

  //useEffect(() =>{
  //  const bar = async () => {
  //    return await createSubscription(plan)
  //  }
  //  const res = bar()
  //
  //  console.log({
  //    'hello-from-use-subscription': res
  //  })
  //}, [plan])

  return foo;
}