'use client';
// shadcn imports
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

// use router as we are in a client component
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserAuthModal() {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset loading state when pathname changes
    setLoading(false);
  }, [pathname]);

  if (pathname === '/sign-up') return '';
  return (
    <Dialog
      modal={true}
      defaultOpen={true}
      open={true}
    >
      <DialogContent
        hidden={false}
        className="bg-black rounded-lg"
      >
        <div className="flex flex-col gap-y-3 items-center">
          <h2 className="text-3xl font-bold text-center">You need to log in</h2>
          <p className="text-center">Click the button below to log in.</p>
          <Button
            className="border border-white w-fit px-6"
            onClick={() => {
              setLoading(true);
              router.push('/sign-up');
            }}
          >
            {loading ? (
              <ReloadIcon className="w-3 h-3 animate-spin" />
            ) : (
              'Log in'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
