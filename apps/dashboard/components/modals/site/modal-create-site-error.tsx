'use client';
import { Button } from '~/packages/components/src/ui/button';
import { Dialog, DialogContent } from '~/packages/components/ui/dialog';

interface ModalErrorContentProps {
  content: string;
  button?: {
    text: string;
    href: string;
  }
}

export function ModalErrorContent({
  content,
  button
}: ModalErrorContentProps){
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-white text-sm font-satoshi">
        {content}
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
          href={button?.href}
          variant='secondary' 
        >
          {button?.text}
        </Button>
      </div>
    </div>
  );
}

export default function ModalCreateSiteError({
  title,
  content = (
    <ModalErrorContent 
      content="To create a new site, please upgrade your subscription" 
      button={{
        text: 'Upgrade Subscription',
        href: '/pricing'
      }}
    />
  )
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