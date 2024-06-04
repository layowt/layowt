'use client'
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { isLightOrDark } from '@/utils/colors';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverArrow } from '@radix-ui/react-popover';
import { updateWebsite } from '@/utils/websites';
import { websites } from '@prisma/client';
import { useAppSelector } from '@/utils/index';
import { website } from '@/store/slices/website-store';

export function ModalColorPickerTrigger({
  color,
  content
}: {
  color: string,
  content?: React.ReactNode
}){
  return (
    <PopoverTrigger asChild>
      <div className="flex gap-x-2 items-center hover:cursor-pointer">
        {content}
        <p className="font-extralight text-[10px]">{color}</p>
        <div
          className="rounded-full size-8 border"
          style={{ 
            backgroundColor: color,
            border: isLightOrDark(color) === 'light' ? '1px solid #2D2D2D' : '1px solid white'
          }}
        ></div>
      </div>
    </PopoverTrigger>
  )
}

interface ModalColorProps {
  color: string;
  onColorChange: (color: string) => void;
  showTitle?: boolean;
  trigger: React.ReactNode;
  popoverContent?: React.ReactNode;
}

export default function ModalColorPicker({
  color,
  onColorChange,
  trigger,
  popoverContent
}: ModalColorProps) {
  const currentSite = useAppSelector(website);

  const handleColorChange = (newColor) => {
    onColorChange(newColor);
  };

  type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

  const updateColorChange = async( 
    fieldValue: PartialPick<websites, 
      'websiteBackgroundColor' | 
      'websitePrimaryColor' | 
      'websiteSecondaryColor'
      >) => {
    await updateWebsite(currentSite?.websiteId, {
      ...fieldValue
    })  
  }

  return (
    <Popover>
      {trigger}
      <PopoverContent
        className="
          bg-black-75 border border-black-50 focus:outline-none 
          rounded-lg shadow-lg sm:rounded-lg p-5 w-fit
        "
        onInteractOutside={(e) => {
          updateColorChange({
            websitePrimaryColor: color
          })
        }}
      >
        <div className="flex flex-col gap-y-4">
          <HexColorPicker
            color={color}
            onChange={handleColorChange}
          />
          <HexColorInput
            color={color}
            onChange={handleColorChange}
            className="bg-black-75 border border-black-50 px-2 py-1 rounded-lg"
          />
          {popoverContent}
        </div>
      <PopoverArrow  className='fill-black-75'/>
      </PopoverContent>
    </Popover>
  )
}