import React, { useState, useEffect, ReactNode } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { isLightOrDark } from '@/utils/colors';

export function ModalColorPickerTrigger({
  color,
  content
}: {
  color: string,
  content?: ReactNode
}){
  return (
    <DialogTrigger asChild>
      <div className="flex gap-x-2 items-center hover:cursor-pointer">
        {content}
        <div
          className="rounded-full size-8 border"
          style={{ 
            backgroundColor: color,
            border: isLightOrDark(color) === 'light' ? '1px solid #000' : '1px solid #fff'
          }}
        ></div>
        <p className="font-extralight text-[10px]">{color}</p>
      </div>
    </DialogTrigger>
  )
}

interface ModalColorProps {
  color: string;
  onColorChange: (color: string) => void;
  showTitle?: boolean;
  trigger: ReactNode;
}

export default function ModalColorPicker({
  color,
  onColorChange,
  trigger
}: ModalColorProps) {
  const [colour, setColor] = useState(color);

  useEffect(() => {
    setColor(color);
  }, [color]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
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
            color={color}
            onChange={handleColorChange}
          />
          <HexColorInput
            color={color}
            onChange={handleColorChange}
            className="bg-black-75 border border-black-50 px-2 py-1 rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}