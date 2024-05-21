import { useRef, useEffect, useState } from 'react';
import { device } from '@/store/slices/index';
import { useAppSelector } from '@/utils/index';
import useDragger from '@/hooks/useCanvasPosition';
import useWindowSize from '@/hooks/useWindowSize';
import useElementSize from '@/hooks/useElementSize';
import { setCanvasZoom } from '@/utils/canvas/utils';
import { addPositionTagToElement } from '@/utils/canvas/debug';
import { detectCanvasOutOfBounds } from '@/utils/canvas/bounds';

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
      width: deviceWidthMap[currentDevice].width,
      height: deviceWidthMap[currentDevice].height
    });

    addPositionTagToElement(canvasContainer.current);

  }, [currentDevice]);

  // Get the width and height of the canvas wrapper element
  //const { width, height } = useElementSize('canvas-container', currentDevice);

  let zoom = 1;

  const handleWheel = (e) => {
    e.preventDefault();

    let scale = setCanvasZoom(e, zoom)

    if (canvasContainer.current) {
      canvasContainer.current.style.transform = `scale(${scale})`;
    }
    zoom = scale;

    addPositionTagToElement(canvasContainer.current);
  };

  useEffect(() => {
    const currentCanvasContainer = canvasContainer.current;

    detectCanvasOutOfBounds(currentCanvasContainer, canvasContainerWrapper.current);

    if (currentCanvasContainer) {
      addPositionTagToElement(currentCanvasContainer);
      currentCanvasContainer.addEventListener('wheel', handleWheel);
      // Cleanup event listener on component unmount
      return () => {
        currentCanvasContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // Pass in the max top value of the wrapper canvas to prevent the user from
  // being able to drag the canvas above that point (outside the viewport)
  // useDragger('canvas-container', {
  //   windowWidth: windowSize.width,
  //   windowHeight: windowSize.height,
  //   elementWrapperWidth: canvasContainerWrapper.current?.clientWidth,
  //   elementHeight: height,
  //   elementWidth: width,
  //   zoom: zoom
  // });

  return (
    <div
      className="w-4/6 h-[calc(100vh-73px)] fixed overflow-hidden flex justify-center items-center bottom-0"
      ref={canvasContainerWrapper}
    >
      <div
        className="
        size-0 fixed bg-white 
        border border-black-50
      "
        style={{
          isolation: 'isolate',
          willChange: 'transform',
          cursor: 'grab',
          width: deviceSize.width,
          top: canvasContainerWrapper.current?.offsetTop + 20,
          
          height: '90vh',
        }}
        id="canvas-container"
        ref={canvasContainer}
      >
        {/* <div className="absolute bg-black text-whtie border border-white"> testing left</div>
        <div className="absolute bg-black text-whtie border border-white bottom-0 left-0"> testing bottom</div> */}
        <div
          className="bg-white h-[650px] transition-all duration-200 fixed text-black"
          style={{
            maxWidth: deviceSize.width
          }}
          id="canvas"
        >
        </div>
      </div>
    </div>
  );
}
