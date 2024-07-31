'use client';
import { useAppDispatch } from '@/utils/index';
import { setWebsite } from '@/store/slices/website-store';

export default function PageClient({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  dispatch(setWebsite(null));

  return <>{children}</>;
}
