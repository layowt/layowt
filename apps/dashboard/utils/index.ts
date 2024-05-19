// tailwind merge
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// reduxs
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from '@/store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//export const useAppStore: () => AppStore = useStore;

/**
 * Method to get the current environment
 * 
 * @returns 'development' | 'production' | 'test'
 */
export const getEnv = () => process.env.NODE_ENV;

/**
 * Method to merge tailwind classes
 * 
 * @param inputs 
 * @returns 
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}


/**
 * Method to get the time since a timestamp
 * 
 * @param date 
 */
export const getTimeStamp = (
  date: string | number | Date = new Date()
) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return `Just now`;
  if(minutes === 1) return `1 minute ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

export const getBaseUrl = () => {
  const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'https://app.layowt.com'
  return getEnv() === 'development' ? 'http://localhost:4343' :  publicRootDomain
}


