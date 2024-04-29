'use client';
import { cn } from '@/lib/utils';
import type { DeviceType } from '@/types/DeviceType';
import { device, setDeviceType } from '@/store/slices/index';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';

import { MobileIcon, DesktopIcon, LaptopIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface Devices {
  id: DeviceType;
  icon: React.ComponentType<{}>;
  screenSize: number;
  selected: boolean;
}

// set here to change
const width = 28 as const;
const height = 28 as const;

export default function ScreenSizeSwapper() {
  // get device type
  const selectedDeviceType = useAppSelector(device);
  const dispatch = useAppDispatch();

  // create array of devices
  const devices: Devices[] = [
    {
      id: 'mobile',
      icon: () => (
        <MobileIcon
          width={width}
          height={height}
        />
      ),
      screenSize: 680,
      selected: false
    },
    {
      id: 'laptop',
      icon: () => (
        <LaptopIcon
          width={width}
          height={height}
        />
      ),
      screenSize: 1080,
      selected: false
    },
    {
      id: 'desktop',
      icon: () => (
        <DesktopIcon
          width={width}
          height={height}
        />
      ),
      screenSize: 1440,
      selected: true // default this to true when the user loads onto the page builder for the first time
    }
  ];

  const setDevice = (deviceId: Devices['id']) => {
    // set the device in redux
    dispatch(setDeviceType(deviceId));
  };

  return (
    <>
      <div className="text-white flex gap-x-3">
        {devices.map((device) => (
          <IconButton
            key={device.id}
            className={cn(
              `
							hover:bg-black-50 duration-300 hover:cursor-pointer rounded-md p-1.5
							`,
              selectedDeviceType === device.id
                ? 'bg-black-50'
                : 'bg-transparent'
            )}
            onClick={() => setDevice(device.id)}
          >
            <device.icon />
          </IconButton>
        ))}
      </div>
    </>
  );
}
