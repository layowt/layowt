'use client';
import { useSearchParams } from "next/navigation";

interface GetQueryParamsProps {
  keys?: string | string[]
}

/**
 * Method to get all parameters in a query string.
 * (
 *  not to be confused with 'useQueryParams', which allows 
 *  you to set query params.
 * )
 * 
 * @returns string | string[]
 */
export const getQueryParams = <T extends (...args: any[]) => any>({
  keys
}: GetQueryParamsProps): Parameters<T>[0] => {
  const searchParams = useSearchParams();
  // check that the passed in key(s) exist
  const searchParamsKeys = Array.from(searchParams.keys());

  // if no keys were passed in, return all values in the searchParams
  if(!keys || keys.length === 0){
    return Array.from(searchParams.values()) as unknown as T;
  }

  const values: string[] = [];
  for(const key of searchParamsKeys){
    const value = searchParams.get(key);
    if(value === null || !keys.includes(key)){
      continue;
    }
    values.push(value);
  }

  return values as unknown as T;
}
