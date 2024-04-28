'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { updateWebsite } from '@/utils/websites/website.post';
import { website } from '@/store/slices/website-store';
import { useAppSelector } from '@/lib/hooks';

/**
 *
 * @returns Needs to:
 * - output an input element so a user can input the name of their site ✅
 * - Have a default value which iterates through adjectives with first part of email pre-pended
 * 	- e.g - logan's stunning site / logan's wonderful product
 * - debounce time of 2 second to save the name to the db
 * - can also be instantly saved via using the enter hotkey
 * - can pull the value from the database to output once changed
 */
export default function WebsiteNameInput() {
  const currentWebsite = useAppSelector(website);
  const [siteName, setSiteName] = useState('');
  const [debouncedSiteName, setDebouncedSiteName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  // every second, update the website name
  // useEffect(() => {
  //   const delayedInput = setTimeout(() => {
  //     setDebouncedSiteName(siteName);
  //   }, 1000);
  //   return () => clearTimeout(delayedInput);
  // }, [siteName, 1000]);

  // useEffect to handle saving debouncedSiteName to the database
  useEffect(() => {
    // Ensure debouncedSiteName is not empty before updating the database
    if (debouncedSiteName) {
      updateWebsite('', { websiteName: siteName });
    }
  }, [debouncedSiteName]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Save immediately on pressing Enter key
      updateWebsite('', { websiteName: siteName });
    }
  };

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
        onKeyDown={handleKeyPress}
      />
      {currentWebsite?.websiteId}
    </>
  );
}
