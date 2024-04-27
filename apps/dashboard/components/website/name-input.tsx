'use client';
import { useState } from 'react';
import { Input } from '@/ui/input';

/**
 *
 * @returns Needs to:
 * - output an input element so a user can input the name of their site
 * - Have a default value which iterates through adjectives with first part of email pre-pended
 * 	- e.g - logan's stunning site / logan's wonderful product
 * - debounce time of 2 second to save the name to the db
 * - can also be instantly saved via using the enter hotkey
 * - can pull the value from the database to output once changed
 */
export default function WebsiteNameInput() {
  const [siteName, setSiteName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  return (
    <Input
      padding="md"
      type="text"
      name="websiteNameInput"
      value={siteName}
      onChange={handleChange}
      color="light-black"
      variant="transparent"
    />
  );
}
