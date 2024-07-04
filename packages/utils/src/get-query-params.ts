'use client';
import { useSearchParams } from "next/navigation";

interface GetQueryParamsProps {
  keys?: string | string[]
  returnMany?: boolean
}

/**
 * Method to extract all params in a query.
 * 
 * @returns string | string[]
 */
export const getQueryParams = <T extends (...args: any[]) => any>({
  keys
}: GetQueryParamsProps): Parameters<T>[0] => {
  const searchParams = useSearchParams();
  // check that the passed in key(s) exist
  const searchParamsKeys = searchParams.keys();

  const arr = [];
  for(const key of searchParamsKeys){
    // if the passed in key is valid, get the value for that key and return it
    if(keys?.includes(key)){
      arr.push(searchParams.get(key))
    }
  }

  return arr;
}