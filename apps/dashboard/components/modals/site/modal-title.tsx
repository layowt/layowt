import { DialogTitle } from '@/components/ui/dialog';

export default function SiteOnboardingTitle() {
  return (
    <div className="flex flex-col gap-y-0.5">
      <DialogTitle className="mt-2 grid grid-cols-12 gap-x-4 items-center">
        <div className="bg-white size-14 rounded-full col-span-2"></div>
        <div className="flex flex-col gap-y-1 col-span-10">
          <h1 className="text-2xl font-semibold text-white font-poppins">
            Welcome to the site builder!
          </h1>
          <p className="text-white/80 text-xs font-poppins font-light">
            You're digital journey begins here, we just need a few details
            before we can continue.
          </p>
        </div>
      </DialogTitle>
    </div>
  );
}
