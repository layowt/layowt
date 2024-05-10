import { DeviceType } from "@/types/DeviceType";
import { useEffect, useState } from "react";

const useElementSize = (id: string, deviceType: DeviceType) => {
	console.log(deviceType);
  const [size, setSize] = useState({ width: 0, height: 0 });

	// check the size of the element upon the id & the device type
  useEffect(() => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`Element with id '${id}' not found.`);
      return;
    }

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
  }, [deviceType]);

  return size;
};

export default useElementSize;
