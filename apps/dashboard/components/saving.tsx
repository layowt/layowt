'use client';
import { useAppSelector } from '@/lib/hooks';
import { saving } from '@/store/slices/website-store';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function LoadingSpinner() {
  const savingState = useAppSelector(saving);
  return (
    <>{savingState === 'saving' && <ReloadIcon className="animate-spin" />}</>
  );
}
