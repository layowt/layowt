import { Suspense } from 'react';
import Loading from '../app/loading';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="flex text-white font-kanit">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
