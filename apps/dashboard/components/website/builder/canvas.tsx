import { useRef, useEffect, useState } from 'react';
import { device } from '@/store/slices/index';
import { useAppSelector } from '@/lib/hooks';
import useDragger from '@/hooks/useCanvasPosition';

export default function SiteBuilderCanvas() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const currentDevice = useAppSelector(device);

  const [deviceWidth, setDeviceWidth] = useState(1024);

  // change the device width based on the current device
  useEffect(() => {
    const deviceWidthMap = {
      desktop: 1024,
      laptop: 768,
      mobile: 384
    };

    setDeviceWidth(deviceWidthMap[currentDevice]);
  }, [currentDevice]);

  useDragger('canvas-container');

  return (
    <div
      className="top-0 bottom-0 left-0 right-0 z-20 fixed size-0"
      style={{
        isolation: 'isolate',
        willChange: 'transform',
        cursor: 'grab',
        transformOrigin: 'left top'
      }}
      id="canvas-container"
    >
      <div
        className="bg-white h-[650px] transition-all duration-200 fixed text-black"
        style={{
          width: deviceWidth,
          scale: 0.5
        }}
      ></div>
    </div>
  );
}
