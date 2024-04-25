'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

import { MobileIcon, DesktopIcon, LaptopIcon } from '@radix-ui/react-icons';

interface Devices {
  icon: React.ComponentType<{}>;
  screenSize: number;
  selected: boolean;
}

export default function ScreenSizeSwapper() {
  // create array of devices
  const devices: Devices[] = [
    {
      icon: MobileIcon,
      screenSize: 680,
      selected: false
    },
    {
      icon: LaptopIcon,
      screenSize: 1080,
      selected: false
    },
    {
      icon: DesktopIcon,
      screenSize: 1440,
      selected: true // default this to true when the user loads onto the page builder for the first time
    }
  ];

  return (
    <div className="text-white flex gap-x-4">
      {devices.map((device, index) => (
        <Button
          key={index}
          className="size-5"
          variant="none"
          padding="none"
          size="icon"
          hoverEffect={false}
        >
          <device.icon />
        </Button>
      ))}
    </div>
  );
}
