import { useRef, useEffect, useState } from 'react';
import { device } from '@/store/slices/index';
import { useAppSelector } from '@/lib/hooks';
import useDragger from '@/hooks/useCanvasPosition';

export default function SiteBuilderCanvas() {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const currentDevice = useAppSelector(device);

  const [deviceSize, setDeviceSize] = useState({
    width: 1024,
    height: 650
  });
  const [canvasPosition, setCanvasPosition] = useState({
    width: 0,
    height: 0
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

  useDragger('canvas-container', { maxTop: canvasPosition.height + 90 });

  // useEffect(() => {
  //   const foo = document.getElementById('testing-canvas');

  //   foo.addEventListener(
  //     'wheel',
  //     (e) => {
  //       // prevent the default behavior of the scroll event
  //       e.preventDefault();

  //       console.log(e.deltaZ);

  //       // get the zoom level
  //       const scale = 0.5 + e.deltaZ * 0.01;

  //       // apply the zoom level to the canvas
  //       document.getElementById('canvas-container').style.scale = `${scale}`;
  //     },
  //     {
  //       passive: false
  //     }
  //   );
  // }, []);

  const canvasContainerWrapper = useRef<HTMLDivElement>(null);

  // get the width and height of the canvas wrapper element
  // this is needed to prevent the user from dragging the canvas
  // outside of the viewport
  useEffect(() => {
    // get the width and height of the screen
    const { width: bodyWidth, height: bodyHeight } =
      document.body.getBoundingClientRect();

    const { width, height } =
      canvasContainerWrapper.current.getBoundingClientRect();

    const canvasPosition = {
      width: bodyWidth - width,
      height: bodyHeight - height
    };
    setCanvasPosition(canvasPosition);
  }, []);

  return (
    <div
      className="w-4/6 h-[calc(100vh-73px)] fixed overflow-hidden block bottom-0"
      ref={canvasContainerWrapper}
    >
      <div
        className="
				size-0 fixed w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-white 
				border border-black-50 overflow-hidden
			"
        style={{
          isolation: 'isolate',
          willChange: 'transform',
          cursor: 'grab',
          transformOrigin: 'left top',
          scale: 0.5,
          width: deviceSize.width,
          height: deviceSize.height
        }}
        id="canvas-container"
      >
        <div
          className="bg-white h-[650px] transition-all duration-200 fixed text-black"
          style={{
            maxWidth: deviceSize.width
          }}
        ></div>
      </div>
    </div>
  );
}
