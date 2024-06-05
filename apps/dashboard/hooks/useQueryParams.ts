import { useCallback } from "react";
import { useAppDispatch } from "../utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  name: string;
  value: string;
}

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

const useQueryParams = <T extends (...args: any[]) => any>({ name, value }: Props, callback: T) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const handleButtonClick = useCallback(
    (parameter: Parameters<T>[0]) => {
      callback(parameter);
      console.log(value)
      router.push(
        pathname + '?' + createQueryString(name, value)
      );
    },
    [callback, router, pathname, createQueryString, name, value]
  );

  return handleButtonClick;
}

export { useCreateQueryString, useQueryParams };
