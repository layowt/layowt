// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Input } from '@/ui/input';
import { updateWebsite } from '@/utils/websites/website.post';
import useDebounce from '@/hooks/useDebounce';
import usePageRefresh from '@/hooks/usePageRefresh';
import { website } from '@/store/slices/website-store';
import { useAppSelector } from '@/lib/hooks';

// Define the WebsiteNameInput component
export default function WebsiteNameInput() {
  // Retrieve currentWebsite from Redux store using useAppSelector
  const currentWebsite = useAppSelector(website);

  // Local state to manage siteName input and its debounced value
  const [siteName, setSiteName] = useState(currentWebsite?.websiteName || '');
  const [isSaving, setIsSaving] = useState(false); // Track saving state

  // Use debounce to track changes in siteName
  const debouncedSiteName = useDebounce(siteName, 1000);

  // check if we have saved before we allow the user to refresh the page
  const canRefresh = usePageRefresh(isSaving);

  // Handle input change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
    setIsSaving(false); // Indicate that changes are not yet saved
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
      setIsSaving(true); // Set saving state to true when saving starts

      updateWebsite(currentWebsite.websiteId, {
        websiteName: debouncedSiteName
      }).then(() => {
        setIsSaving(false); // Set saving state to false when saving is completed
      });
    }
  }, [debouncedSiteName, currentWebsite]);

  // Handle Enter key press to save immediately
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentWebsite?.websiteId) {
      updateWebsite(currentWebsite.websiteId, { websiteName: siteName });
      setIsSaving(true); // Indicate that saving is in progress
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
      className="font-poppins"
    />
  );
}
