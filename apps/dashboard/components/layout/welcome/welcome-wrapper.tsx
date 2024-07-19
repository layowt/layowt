'use client';
import { domAnimation, LazyMotion } from 'framer-motion';
import { createContext, useContext, useState, useEffect } from 'react';
import { useHash as HashHook } from '@/hooks/useHash';

interface HashContextType {
  hash: string;
  updateHash: (newHash: string) => void;
  userOnboardingDetails: {
    firstName: string;
    lastName: string;
    displayName: string;
  }
}

/**
 * Create the context for the component
 * 
 * @default { hash: '', updateHash: (newHash: string) => {} }
 * @returns {React.Context}
 */
export const HashContext = createContext<HashContextType>({
  hash: '',
  updateHash: (newHash: string) => {},
  userOnboardingDetails: {
    firstName: '',
    lastName: '',
    displayName: '',
  }
});

export const HashProvider = ({ children }) => {
  const initialHash = HashHook();
  const [hash, setHash] = useState(initialHash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const updateHash = (newHash) => {
    if (typeof window !== 'undefined') {
      window.location.hash = newHash; // This will trigger the 'hashchange' event
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <HashContext.Provider value={{ hash, updateHash, userOnboardingDetails: { displayName: '', lastName: '', firstName: ''} }}>
        <div
          className="
            bg-black-300 border border-black-100 text-white font-inter
            flex flex-col justify-center items-center p-10 rounded-lg relative
          "
        >
          {children}
        </div>
      </HashContext.Provider>
    </LazyMotion>
  );
};

export const useHash = () => {
  const context = useContext(HashContext);
  if (!context) throw new Error('useHash must be used within a HashProvider');
  return context;
};
