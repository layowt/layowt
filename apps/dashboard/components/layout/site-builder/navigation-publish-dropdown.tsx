import { useEffect, useState } from 'react';
import { updateWebsite, updateWebsiteUrlChange } from '@/utils/websites';
import {
  ChevronDownIcon,
  ArrowRightIcon,
  Pencil1Icon
} from '@radix-ui/react-icons';
import { getEnv } from '@/utils/index';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from '@/ui/dropdown-menu';
import PublishDropdownItems from './navigation-publish-dropdown-items';

export default function SiteBuilderPublishModal({ website }) {
  const [websiteUrlEditor, setWebsiteUrlEditor] = useState(false);
  const [websiteUrlEditable, setWebsiteUrlEditable] = useState('');

  // useEffect to update the website url in the backend when websiteUrlEditor changes
  useEffect(() => {
    if (!website?.websiteId) return;

    setWebsiteUrlEditable(website?.websiteUrl?.split('.')[0] || '');

    // make an array of the website url and split it by '.'
    const websiteUrl = website?.websiteUrl.split('.');
    //change the first part of the array with the new websiteUrlEditable
    websiteUrl[0] = websiteUrlEditable;
    // join the array back together with a '.' in between
    const newUrl = websiteUrl.join('.');

    // Call the updateUrl function when websiteUrlEditor changes
    if (!websiteUrlEditor) {
      updateWebsiteUrlChange(website.websiteId, newUrl);
    }
  }, [websiteUrlEditor]);

  const env = getEnv() === 'production' ? 'https' : 'http';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="!rounded-bl-none !rounded-tl-none group-hover:!bg-white 
            group-hover:text-black px-2 !border-0 focus-visible:!outline-none
            focus-visible:!ring-0 focus-within:border-none"
          rounded="sm"
          size="sm"
          hoverEffect={false}
        >
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="font-inter border border-black-50 !bg-black text-white/80 m-2 w-80"
        side="bottom"
        align="end"
      >
        <div className="text-base font-normal flex flex-col gap-y-1 font-inter">
          <span className="text-xs text-white/60">
            {website?.websiteName}: {websiteUrlEditor}
          </span>
          <div className="flex items-center justify-between w-full">
            {websiteUrlEditor ? (
              <input
                type="text"
                className="w-full text-white/80 bg-transparent focus-visible:outline-none placeholder:text-[10px]"
                value={websiteUrlEditable}
                onChange={(e) => {
                  setWebsiteUrlEditable(e.target.value);
                }}
              />
            ) : (
              <Link
                className="text-sm text-white group flex items-center gap-x-1 hover:underline"
                href={`${env}://${website?.websiteUrl}`}
                prefetch
                target="_blank"
              >
                {website?.websiteUrl || 'Not Published'}
                <ArrowRightIcon className="relative size-3 opacity-0 group-hover:opacity-100 -left-2 group-hover:left-0 duration-300 transition-all" />
              </Link>
            )}
            <button
              onClick={() => {
                setWebsiteUrlEditor(!websiteUrlEditor);
              }}
            >
              <Pencil1Icon
                className="cursor-pointer transition-colors duration-300"
                style={{
                  color: websiteUrlEditor ? '#6725f2' : '#ffffff'
                }}
              />
            </button>
          </div>
        </div>
        <DropdownMenuSeparator className="!bg-black-50" />
        <DropdownMenuGroup>
          {/* You can include PublishDropdownItems here */}
          <PublishDropdownItems website={website} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
