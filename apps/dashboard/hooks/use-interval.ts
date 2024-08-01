import { useEffect, useRef, useState } from 'react';

const useInterval = (fn: () => void, interval: number = 1000, seconds: number = 5) => {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>();
  const fnRef = useRef<() => void>();

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const start = () => {
    setActive(true);
		// Initialize remaining interval
    let remaining = interval * seconds; 

		// Start the interval
    intervalRef.current = window.setInterval(() => {
			// decrease the remaining interval by 1 second
			remaining -= 1000
			// if the remaining interval reaches zero or less, stop the interval
      if (remaining <= 0) {
        // If remaining interval reaches zero or less, stop the interval
        clearInterval(intervalRef.current);
        setActive(false);
      }
      fnRef.current!(); // Call the provided function
    }, 1000); // Run every second
  };

  const stop = () => {
    setActive(false);
    clearInterval(intervalRef.current);
  };

  const toggle = () => {
    setActive((prevActive) => !prevActive);
  };

  return { start, stop, toggle, active };
}

export default useInterval;