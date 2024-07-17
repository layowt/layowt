import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useCreateQueryString = () => {
  const searchParams = useSearchParams();

  return useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(name, value);
      return newSearchParams.toString();
    },
    [searchParams]
  );
}

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const updateQueryParams = useCallback(
    (name: string, value: string, callback?: (value: string) => void) => {
      if (callback) {
        callback(value);
      }
      if (typeof window !== 'undefined') {
        router.push(
          `${pathname}?${createQueryString(name, value)}`
        );
      }
    },
    [router, pathname, createQueryString]
  );

  return updateQueryParams;
}

export { useCreateQueryString, useQueryParams };
