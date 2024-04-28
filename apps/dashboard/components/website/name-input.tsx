// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Input } from '@/ui/input';
import { updateWebsite } from '@/utils/websites/website.post';

// hooks
import useDebounce from '@/hooks/useDebounce';
import usePageRefresh from '@/hooks/usePageRefresh';

// redux
import { website, saving, setSavingState } from '@/store/slices/website-store';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

// Define the WebsiteNameInput component
export default function WebsiteNameInput() {
  const dispatch = useAppDispatch();
  const savingValue = useAppSelector(saving);
  // Retrieve currentWebsite from Redux store using useAppSelector
  const currentWebsite = useAppSelector(website);

  // Local state to manage siteName input and its debounced value
  const [siteName, setSiteName] = useState(currentWebsite?.websiteName || '');
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  // Use debounce to track changes in siteName
  const debouncedSiteName = useDebounce(siteName, 1000);

  // check if we have saved before we allow the user to refresh the page
  const canRefresh = usePageRefresh(savingValue);

  // Handle input change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
    dispatch(setSavingState('idle'));
  };

  // Effect to update siteName when currentWebsite changes
  useEffect(() => {
    if (currentWebsite?.websiteName) {
      setSiteName(currentWebsite.websiteName);
    }
  }, [currentWebsite]);

  // Effect to handle saving debouncedSiteName to the database
  useEffect(() => {
    if (debouncedSiteName && currentWebsite?.websiteId) {
      dispatch(setSavingState('saving'));

      updateWebsite(currentWebsite.websiteId, {
        websiteName: debouncedSiteName
      }).then(() => {
        dispatch(setSavingState('idle'));
      });
    }
  }, [debouncedSiteName, currentWebsite]);

  // Handle Enter key press to save immediately
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentWebsite?.websiteId) {
      updateWebsite(currentWebsite.websiteId, { websiteName: siteName });
      dispatch(setSavingState('saving'));
    }
  };

  // Render the input component with associated event handlers
  return (
    <Input
      padding="md"
      type="text"
      name="websiteNameInput"
      value={siteName}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      color="light-black"
      variant="transparent"
      placeholder=""
      className="font-poppins pl-0"
    />
  );
}
