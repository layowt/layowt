import { DeviceType } from "@/types/DeviceType";
import { useEffect, useState } from "react";

const useElementSize = (element: HTMLElement, deviceType?: DeviceType) => {

  const [size, setSize] = useState({ width: 0, height: 0 });

	// check the size of the element upon the id & the device type
  useEffect(() => {
    if(!element) return;

    const handleWindowResize = () => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight
      });
    };

    // Initial size calculation
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [deviceType ?? '']);

  return size;
};

export default useElementSize;
