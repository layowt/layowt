'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

function ModalErrorContent(){
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-white text-sm font-satoshi">
        To create a new site, please upgrade your subscription
      </p>
      <div className="grid grid-cols-2 gap-x-4">
        <Button 
          className='w-full'
          href="/dashboard"
          variant='tertiary' 
        >
          Go to Dashboard
        </Button>
        <Button 
          className='w-full'
          href="/pricing"
          variant='secondary' 
        >
          Upgrade Subscription
        </Button>
      </div>
    </div>
  );
}

export default function ModalCreateSiteError({
  title,
  content = <ModalErrorContent />
}: {
  title: React.ReactNode;
  content?: React.ReactNode;
}){
  return ( 
    <Dialog
      modal={true}
      defaultOpen={true}
    >
      <DialogContent 
        showCloseButton={false}
        className="
          bg-black-75 border border-black-50 focus:outline-none rounded-lg 
          shadow-lg sm:rounded-lg p-10 w-full max-w-lg text-white flex flex-col 
          gap-y-2
        "
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {title}
        {content}
      </DialogContent>
    </Dialog>
  )
}