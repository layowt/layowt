import { useRef, useEffect, useState } from 'react';
import { device } from '@/store/slices/index';
import { useAppSelector } from '@/utils/index';
import useDragger from '@/hooks/useCanvasPosition';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';
import { setCanvasZoom } from '@/utils/canvas/utils';

export default function SiteBuilderCanvas() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const currentDevice = useAppSelector(device);
  const canvasContainerWrapper = useRef<HTMLDivElement>(null);

  // Setting the size of the canvas via the deviceType
  const [deviceSize, setDeviceSize] = useState({
    width: 1024,
    height: 650
  });
  // Get the size of the window
  const windowSize = useWindowSize();

  // Change the device width based on the current device
  useEffect(() => {
    if (!canvasContainerWrapper.current) return;

    const deviceWidthMap = {
      desktop: {
        width:
          (canvasContainerWrapper.current.offsetWidth / (1024 + 50)) * 1000,
        height: 1000
      },
      laptop: {
        width:
          (canvasContainerWrapper.current.offsetWidth / (1350 + 50)) * 1000,
        height: 1000
      },
      mobile: {
        width:
          (canvasContainerWrapper.current.offsetWidth / (1600 + 50)) * 1000,
        height: 1000
      }
    };

    setDeviceSize({
      ...deviceSize,
      width: deviceWidthMap[currentDevice]['width'],
      height: deviceWidthMap[currentDevice]['height']
    });
  }, [currentDevice]);

  // Get the width and height of the canvas wrapper element
  const { width, height } = useElementSize('canvas-container', currentDevice);

  // Pass in the max top value of the wrapper canvas to prevent the user from
  // being able to drag the canvas above that point (outside the viewport)
  useDragger('canvas-container', {
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    elementWrapperWidth: canvasContainerWrapper.current?.clientWidth,
    elementHeight: height,
    elementWidth: width
  });

  let zoom = 1
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      const scale = setCanvasZoom(e)
      if (canvasContainer.current) {
        canvasContainer.current.style.transform = `scale(${scale})`;
      }
      zoom = scale
    };

    canvasContainer.current.onwheel = handleWheel;
  }, []);

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
          width: deviceSize.width,
          left: width - (windowSize.width - width),
          height: '90vh',
          top: 93
        }}
        id="canvas-container"
        ref={canvasContainer}
      >
        <div
          className="bg-white h-[650px] transition-all duration-200 fixed text-black"
          style={{
            maxWidth: deviceSize.width
          }}
          id="canvas"
        >
          {zoom}
        </div>
      </div>
    </div>
  );
}
