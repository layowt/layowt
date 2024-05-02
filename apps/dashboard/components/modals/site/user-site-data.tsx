'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function UserSiteData() {
  return (
    <Dialog
      modal={true}
      defaultOpen={true}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-black-75 border border-black-50 focus:outline-none rounded-lg shadow-lg sm:rounded-lg p-6 w-full max-w-lg"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle>
          <h1 className="text-xl font-semibold text-white font-poppins text-center">
            Welcome to your site builder!
          </h1>
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <p className="text-white text-center text-sm font-inter">
            You're next digital journey begins here, we just need a few details
            before we can continue.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
