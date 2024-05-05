'use client';

import { DialogTitle } from '@/components/ui/dialog';
import { websites } from '@prisma/client';
import { CameraIcon } from '@radix-ui/react-icons';
import { useAppDispatch } from '@/lib/hooks';
import { setWebsite } from '@/store/slices/website-store';
import { cn } from '@/lib/utils';

export default function SiteOnboardingTitle({
  userId,
  website
}: {
  userId: string;
  website: websites;
}) {
  const dispatch = useAppDispatch();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('files', data.target.files[0]);
    formData.append('userId', userId);
    formData.append('siteId', website?.websiteId);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const { logoUrl } = await res.json();

      // Update the website with the new logo
      dispatch(setWebsite({ ...website, websiteLogo: logoUrl }));

      //TODO: ADD SONNER TO SHOW THE USER THAT THE LOGO WAS UPLOADED
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-y-0.5">
      <DialogTitle className="mt-2 grid grid-cols-12 gap-x-4 items-center">
        {/** upload icon */}
        <div className="col-span-2">
          <label
            htmlFor="logo-file-upload"
            className={cn(
              'size-14 rounded-full border border-black text-white cursor-pointer flex items-center justify-center',
              website.websiteLogo ? 'bg-transparent' : 'bg-white'
            )}
          >
            {website.websiteLogo ? (
              <img
                src={website.websiteLogo}
                alt="logo"
                className="size-full rounded-full object-cover"
              />
            ) : (
              <CameraIcon className="w-6 h-6" />
            )}
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