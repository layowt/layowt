'use client';

// react
import { useState } from 'react';

// components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { Input } from '@/components/ui/input';

// redux
import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';

// misc / utils
import type { websites as Website } from '@prisma/client';
import { updateWebsite } from '@/utils/websites/website.post';
import type { SavingState } from '@/types/state';

type NewWebsiteData = Pick<
  Website,
  | 'websiteName'
  | 'websiteLogo'
  | 'websitePrimaryColor'
  | 'websiteSecondaryColor'
>;

export default function UserSiteData() {
  const currentSite = useAppSelector(website);

  const [state, setState] = useState<NewWebsiteData>({
    websiteName: '',
    websiteLogo: '',
    websitePrimaryColor: '',
    websiteSecondaryColor: ''
  });
  const [primaryColor, setPrimaryColor] = useState<string>('');
  const [secondaryColor, setSecondaryColor] = useState<string>('');
  const [status, setStatus] = useState<SavingState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const saveSiteData = async (siteId: string, Data: NewWebsiteData) => {
    setStatus('saving');
    try {
      updateWebsite(siteId, Data);
    } catch (e) {
      setStatus('error');
    }
    setStatus('idle');
  };

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
        <div className="flex flex-col gap-y-2">
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
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-y-1 relative">
              <label
                htmlFor="websiteName"
                className="text-white/80 text-sm pl-1"
              >
                Site Name: {currentSite.websiteId}
              </label>
              <Input
                type="text"
                className="w-full peer"
                placeholder=""
                id="websiteName"
                value={state.websiteName}
                onChange={handleChange}
                name="websiteName"
              />
            </div>
            {/** Site primary / secondary brand color */}
            <div className="flex gap-4 mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-x-2 items-center hover:cursor-pointer">
                    <div
                      className="rounded-full size-8 border border-black"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <div className="flex flex-col gap-y-0.5">
                      <span className="text-xs">Primary Color</span>
                      <p className="font-extralight text-[10px]">
                        {primaryColor}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={true}
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  className="bg-black-75 border border-black-50 focus:outline-none rounded-lg shadow-lg sm:rounded-lg p-10 w-fit"
                >
                  <div className="flex flex-col gap-y-4">
                    <HexColorPicker
                      color={primaryColor}
                      onChange={setPrimaryColor}
                    />
                    <HexColorInput
                      color={primaryColor}
                      onChange={setPrimaryColor}
                      className="bg-black-75 border border-black-50 px-2 py-1 rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-x-2 items-center hover:cursor-pointer">
                    <div
                      className="border border-black rounded-full size-8"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <div className="flex flex-col gap-y-0.5">
                      <span className="text-xs">Secondary Color</span>
                      <p className="font-extralight text-[10px]">
                        {secondaryColor}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={true}
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                  className="bg-black-75 border border-black-50 focus:outline-none rounded-lg shadow-lg sm:rounded-lg p-10 w-fit"
                >
                  <div className="flex flex-col gap-y-4">
                    <HexColorPicker
                      color={secondaryColor}
                      onChange={setSecondaryColor}
                    />
                    <HexColorInput
                      color={secondaryColor}
                      onChange={setSecondaryColor}
                      className="bg-black-75 border border-black-50 px-2 py-1 rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {/** The user has to enter the site name in order to continue */}
            <div className="w-full flex justify-between items-center mt-2">
              <Button variant="none">Clear</Button>
              <div className="flex gap-x-4">
                <Button
                  variant="tertiary"
                  disabled={
                    state.websiteName.length === 0 || state.websiteName === null
                  }
                >
                  Skip for now
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => saveSiteData(currentSite.websiteId, state)}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
