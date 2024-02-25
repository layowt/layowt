'use client';
import { useUser } from '@/utils/firebase';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function UserAuthentication({
  children
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const pathname = usePathname();

  return <>{children}</>;
}
