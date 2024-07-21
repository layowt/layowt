'use client';
import { domAnimation, LazyMotion } from 'framer-motion';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

interface HashContextType {
  hash: string;
  setHash: (newHash: string) => void;
  userOnboardingDetails: {
    firstName: string;
    lastName: string;
    displayName: string;
  };
}

const defaultHashContext: HashContextType = {
  hash: '',
  setHash: () => {},
  userOnboardingDetails: {
    firstName: '',
    lastName: '',
    displayName: '',
  },
};

export const HashContext = createContext<HashContextType | null>(null);

export const HashProvider = ({ children }) => {
  const [hash, setHashState] = useState('');
  const userOnboardingDetails = useMemo(
    () => ({ firstName: '', lastName: '', displayName: '' }),
    []
  );

  const setHash = useCallback((newHash: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = newHash;
      setHashState(newHash);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setHashState(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      hash,
      setHash,
      userOnboardingDetails,
    }),
    [hash, setHash]
  );

  return (
    <LazyMotion features={domAnimation}>
      <HashContext.Provider value={contextValue}>
        {children}
      </HashContext.Provider>
    </LazyMotion>
  );
};

export const useHashContext = () => {
  const context = useContext(HashContext);
  if (!context) {
    throw new Error('useHashContext must be used within a HashProvider');
  }
  return context;
};
