import { useCallback } from "react";
import { useAppDispatch } from "../utils";
import { SectionState, setCurrentSection } from '@/store/slices/website-store'
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

const useQueryParams = ({ name, value }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const handleButtonClick = useCallback(
    (section: SectionState) => {
      dispatch(setCurrentSection(section))
      router.push(
        pathname + '?' + createQueryString(name, section)
      )
    },
    [dispatch, router, pathname, createQueryString, name]
  );

  return handleButtonClick;
}

export { useCreateQueryString, useQueryParams };
