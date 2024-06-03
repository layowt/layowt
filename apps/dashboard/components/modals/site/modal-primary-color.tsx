import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { HexColorInput, HexColorPicker } from 'react-colorful';

interface ModalPrimaryColorProps {
  primaryColor: string;
  onColorChange: (color: string) => void;
  showTitle?: boolean;
}

export default function ModalPrimaryColor({
  primaryColor,
  onColorChange,
  showTitle = true,
}: ModalPrimaryColorProps) {
  const [color, setColor] = useState(primaryColor);

  useEffect(() => {
    setColor(primaryColor);
  }, [primaryColor]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-x-2 items-center hover:cursor-pointer">
          <div
            className="rounded-full size-8 border border-black"
            style={{ backgroundColor: color }}
          ></div>

          <div className="flex flex-col gap-y-0.5">
            {showTitle && <span className="text-xs">Primary Color</span>}
            <p className="font-extralight text-[10px]">{color}</p>
          </div>
        </div>
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
  );
}
