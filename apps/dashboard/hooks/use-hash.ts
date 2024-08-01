import { useState, useEffect } from 'react';

/**
 * 
 * Method to get the current hash in the window
 * 
 * @returns the current hash of the window
 */
export const useHash = () => {
  if (typeof window !== 'undefined') {
    const [hash, setHash] = useState(window.location.hash);
    useEffect(() => {
      const onHashChange = () => {
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', onHashChange);
      return () => window.removeEventListener('hashchange', onHashChange);
    }, []);
    return hash;
  }
  return ''; // Return an empty string if window is undefined
};