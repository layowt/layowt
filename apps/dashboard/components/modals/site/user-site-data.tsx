'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { website } from '@/store/slices/website-store';
import type { websites as Website } from '@prisma/client';
import { useState } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { HexColorPicker } from 'react-colorful';

type NewWebsiteData = Pick<
  Website,
  | 'websiteName'
  | 'websiteLogo'
  | 'websitePrimaryColor'
  | 'websiteSecondaryColor'
>;

export default function UserSiteData() {
  const [state, setState] = useState<NewWebsiteData>({
    websiteName: '',
    websiteLogo: '',
    websitePrimaryColor: '',
    websiteSecondaryColor: ''
  });
  const [primaryColor, setPrimaryColor] = useState<string>('');
  const [secondaryColor, setSecondaryColor] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
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
            <span className="text-electric-violet text-[8px] uppercase">
              Site Builder
            </span>
            <DialogTitle>
              <h1 className="text-xl font-semibold text-white font-poppins">
                Welcome to the site builder!
              </h1>
            </DialogTitle>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-white text-xs font-poppins">
              You're digital journey begins here, we just need a few details
              before we can continue.
            </p>
          </div>
          <form className="flex flex-col gap-4 mt-6">
            {/** Site name */}
            <div className="flex flex-col gap-y-1 relative">
              <Input
                type="text"
                className="w-full peer"
                placeholder=""
                id="websiteName"
                value={state.websiteName}
                onChange={handleChange}
                name="websiteName"
              />
              <label
                htmlFor="websiteName"
                className="
									absolute -top-2 left-2.5 text-[10px] text-white/80 font-poppins
									peer-placeholder-shown:text-xs peer-placeholder-shown:top-[12px] bg-black-75
									peer-placeholder-shown:left-5 transition-all peer-placeholder-shown:bg-black-75 
								"
              >
                Site name
              </label>
            </div>
            {/** Site primary / secondary brand color */}
            <div className="flex gap-4 mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-x-2 items-center hover:cursor-pointer">
                    {/** COLOR */}
                    <div
                      className="rounded-full size-8 border border-black"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    {/** PRIMARY COLOR + HEX VALUE */}
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
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex gap-x-2 items-center hover:cursor-pointer">
                    {/** COLOR */}
                    <div
                      className="border border-black rounded-full size-8"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    {/** PRIMARY COLOR + HEX VALUE */}
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
                <Button variant="secondary">Save</Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
