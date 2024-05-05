import { DialogTitle } from '@/components/ui/dialog';
import { CameraIcon } from '@radix-ui/react-icons';

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
        <div className="col-span-2">
          <label
            htmlFor="logo-file-upload"
            className=" 
              size-14 rounded-full bg-white border border-black  
              text-white cursor-pointer flex items-center justify-center
            "
          >
            <CameraIcon className="size-5 text-black-50" />
          </label>
          <input
            id="logo-file-upload"
            type="file"
            onChange={() => {
              onSubmit(event);
            }}
            className="!hidden"
          />
        </div>
        <div className="flex flex-col gap-y-1 col-span-10">
          <h1 className="text-2xl font-semibold text-white font-poppins">
            Welcome to the site builder!
          </h1>
          <p className="text-white/80 text-xs font-poppins font-light">
            You&apos;re digital journey begins here, we just need a few details
            before we can continue.
          </p>
        </div>
      </DialogTitle>
    </div>
  );
}
