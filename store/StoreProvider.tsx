'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { type AppStore, makeStore } from './store';

// types - has to be declared here cannot be exported from a
// external file

export default function StoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
