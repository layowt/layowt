import { useRef, useEffect, useState, use } from 'react';
import { device } from '@/store/slices/index';
import { useAppSelector } from '@/lib/hooks';
import useDragger from '@/hooks/useCanvasPosition';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';

export default function SiteBuilderCanvas() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const currentDevice = useAppSelector(device);

  const [deviceSize, setDeviceSize] = useState({
    width: 1024,
    height: 650
  });

  // change the device width based on the current device
  useEffect(() => {
    const deviceWidthMap = {
      desktop: {
        width: 1024,
        height: 1000
      },
      laptop: {
        width: 768,
        height: 1000
      },
      mobile: {
        width: 464,
        height: 1000
      }
    };

    setDeviceSize({
      ...deviceSize,
      width: deviceWidthMap[currentDevice]['width'],
      height: deviceWidthMap[currentDevice]['height']
    });
  }, [currentDevice]);

  const canvasContainerWrapper = useRef<HTMLDivElement>(null);

  // get the size of the window
  const windowSize = useWindowSize();

  // get the width and height of the canvas wrapper element
  // this is needed to prevent the user from dragging the canvas
  // outside of the viewport
  const { width, height } = useElementSize('canvas-container', currentDevice);

  // pass in the max top value of the wrapper canvas to prevent the user from
  // being able to drag the canvas above that point (outside the viewport)
  useDragger('canvas-container', {
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    elementHeight: height,
    elementWidth: width
  });

  return (
    <div
      className="w-4/6 h-[calc(100vh-73px)] fixed overflow-hidden block bottom-0"
      ref={canvasContainerWrapper}
    >
      <div
        className="
				size-0 fixed bg-white 
				border border-black-50 overflow-hidden
			"
        style={{
          isolation: 'isolate',
          willChange: 'transform',
          cursor: 'grab',
          transformOrigin: 'left top',
          width: deviceSize.width,
          height: '90vh',
          top: 93
        }}
        id="canvas-container"
      >
        <div
          className="bg-white h-[650px] transition-all duration-200 fixed text-black"
          style={{
            maxWidth: deviceSize.width
          }}
          id="canvas"
        >
          {width}
          <br />
          {height}
        </div>
      </div>
    </div>
  );
}
