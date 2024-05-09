'use client';
// react
import { useState } from 'react';

// components
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SiteOnboardingTitle from './modal-title';

// redux
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setWebsite, website } from '@/store/slices/website-store';

// misc / utils
import type { websites as Website } from '@prisma/client';
import { updateWebsite } from '@/utils/websites';
import type { SavingState } from '@/types/state';
import ModalPrimaryColor from './modal-primary-color';
import ModalSecondaryColor from './modal-secondary-color';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

type NewWebsiteData = Pick<
  Website,
  | 'websiteName'
  | 'websitePrimaryColor'
  | 'websiteSecondaryColor'
  | 'websiteLogo'
>;

export default function UserSiteData() {
  const dispatch = useAppDispatch();
  const currentSite = useAppSelector(website);

  const [state, setState] = useState<NewWebsiteData>({
    websiteLogo: currentSite?.websiteLogo || '',
    websiteName: currentSite?.websiteName || '',
    websitePrimaryColor: currentSite?.websitePrimaryColor || '#ffffff',
    websiteSecondaryColor: currentSite?.websiteSecondaryColor || '#6725f2'
  });

  const [status, setStatus] = useState<SavingState>('idle');
  const [openModal, setOpenModal] = useState<boolean>(true);

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

  const setLogo = (logoUrl: string) => {
    setState({
      ...state,
      websiteLogo: logoUrl
    });
  };

  const saveSiteData = async (siteId: string, data: NewWebsiteData) => {
    setStatus('saving');
    try {
      // check if the website name is empty
      if (!data.websiteName) {
        setStatus('error');
        return;
      }

      // Update the website with the new data in the db
      await updateWebsite(siteId, data);

      // update our redux store with the new data
      dispatch(
        setWebsite({
          ...currentSite,
          websiteLogo: data.websiteLogo,
          websiteName: data.websiteName,
          websitePrimaryColor: data.websitePrimaryColor,
          websiteSecondaryColor: data.websiteSecondaryColor,
          lastUpdated: new Date()
        })
      );
      // close the modal
      setOpenModal(false);

      toast.success('Website data saved successfully! 🎉');
    } catch (e) {
      setStatus('error');
    }
    setStatus('idle');
  };

  return (
    <>
      <Dialog
        modal={true}
        defaultOpen={true}
        open={openModal}
      >
        <DialogContent
          showCloseButton={false}
          className="bg-black-75 border border-black-50 focus:outline-none rounded-lg shadow-lg sm:rounded-lg p-6 w-full max-w-lg"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-y-2">
            <SiteOnboardingTitle
              userId={currentSite?.userId}
              website={currentSite}
              onLogoChange={setLogo}
            />
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-y-1 relative">
                <label
                  htmlFor="websiteName"
                  className="text-white/80 text-sm pl-1"
                >
                  Site Name
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
              <div className="w-full flex justify-between items-center mt-2 text-white">
                <Button variant="none">Clear</Button>
                <div className="flex gap-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => saveSiteData(currentSite.websiteId, state)}
                    disabled={state.websiteName === '' || status === 'saving'}
                  >
                    {status === 'saving' ? (
                      <div className="w-6 flex items-center">
                        <ReloadIcon className="animate-spin" />
                      </div>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
