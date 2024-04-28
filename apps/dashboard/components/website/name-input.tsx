'use client';
// Import necessary dependencies
import { useState, useEffect } from 'react';
import { Input } from '@/ui/input';
import { updateWebsite } from '@/utils/websites/website.post';
import { useAppSelector } from '@/lib/hooks';
import useDebounce from '@/hooks/useDebounce';
import { website } from '@/store/slices/website-store';

// Define the WebsiteNameInput component
export default function WebsiteNameInput() {
  // Retrieve currentWebsite from Redux store using useAppSelector
  const currentWebsite = useAppSelector(website);

  // Local state to manage siteName input and its debounced value
  const [siteName, setSiteName] = useState(currentWebsite?.websiteName || '');
  const debouncedSiteName = useDebounce(siteName, 2000);

  // Handle input change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  let init = false;
  // useEffect to handle saving debouncedSiteName to the database
  useEffect(() => {
    // init flag to check if we have fully mounted
    if (!currentWebsite?.websiteId || init) return;
    init = true;

    updateWebsite(currentWebsite?.websiteId, {
      websiteName: debouncedSiteName
    });
  }, [debouncedSiteName]);

  // Handle Enter key press to save immediately
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Save immediately on pressing Enter key
      updateWebsite(currentWebsite?.websiteId, { websiteName: siteName });
    }
  };

  // Render the input component with associated event handlers
  return (
    <>
      <Input
        padding="md"
        type="text"
        name="websiteNameInput"
        value={siteName}
        onChange={handleChange}
        color="light-black"
        variant="transparent"
        placeholder=""
        className="font-poppins"
      />
      {/* Display the current website name */}
      {currentWebsite}
    </>
  );
}
