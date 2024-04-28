import { useEffect, useState } from "react";

const useDebounce = (value: any, delayTime: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delayTime]);

  return debouncedValue;
};

export default useDebounce;
