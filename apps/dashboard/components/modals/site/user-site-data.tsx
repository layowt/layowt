'use client';

// react
import { useState } from 'react';

// components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SiteOnboardingTitle from './modal-title';

// redux
import { useAppSelector } from '@/lib/hooks';
import { website } from '@/store/slices/website-store';

// misc / utils
import type { websites as Website } from '@prisma/client';
import { updateWebsite } from '@/utils/websites/website.post';
import type { SavingState } from '@/types/state';
import ModalPrimaryColor from './modal-primary-color';
import ModalSecondaryColor from './modal-secondary-color';

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

  const [status, setStatus] = useState<SavingState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const setPrimaryColor = (color: string) => {
    setState({
      ...state,
      websitePrimaryColor: color
    });
  };

  const setSecondaryColor = (color: string) => {
    setState({
      ...state,
      websiteSecondaryColor: color
    });
  };

  const saveSiteData = async (siteId: string, Data: NewWebsiteData) => {
    setStatus('saving');
    try {
      await updateWebsite(siteId, Data);
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
          <SiteOnboardingTitle />
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
              <ModalPrimaryColor
                primaryColor={state.websitePrimaryColor}
                onColorChange={(color) => setPrimaryColor(color)}
              />
              <ModalSecondaryColor
                secondaryColor={state.websiteSecondaryColor}
                onColorChange={(color) => setSecondaryColor(color)}
              />
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
