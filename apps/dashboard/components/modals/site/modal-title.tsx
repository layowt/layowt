import { DialogTitle } from '@/components/ui/dialog';

export default function SiteOnboardingTitle({
  userId,
  websiteId
}: {
  userId: string;
  websiteId: string;
}) {
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('files', data.target.value);
    formData.append('userId', userId);
    formData.append('siteId', websiteId);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <div className="flex flex-col gap-y-0.5">
      <DialogTitle className="mt-2 grid grid-cols-12 gap-x-4 items-center">
        {/** upload icon */}
        <input
          type="file"
          onChange={() => {
            onSubmit(event);
          }}
          className="size-10 bg-white rounded-full"
        />
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
