import { useEffect, useRef } from "react";

interface Window {
	windowWidth: number;
	windowHeight: number;
	elementWidth?: number;
	elementHeight?: number;
}

const useDragger = (id: string, opts: Window) => {

	const { windowWidth, windowHeight, elementHeight, elementWidth } = opts

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {

    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
			isClicked.current = false;
			coords.current.lastX = target.offsetLeft;
			coords.current.lastY = target.offsetTop;

			const maxTop = windowHeight - elementHeight;
			const maxBottom = windowHeight - elementHeight;


			// if the current top value of the canvas is less than the max top value
			// of the canvasContainer (the element that is holding the entire 'page')
			// we need to reset the value to the max top value
			if (coords.current.lastY < maxTop) {
				target.style.top = `${maxTop + 20}px`;
				coords.current.lastY = maxTop + 20;
			}

			// if the element's top value is greater than its entire height 
			// 
			if(coords.current.lastY > maxBottom){
				target.style.top = `${maxBottom}px`;
				coords.current.lastY = maxBottom;
			}
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.top = `${nextY}px`;
      target.style.left = `${nextX}px`;
    }

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }
    return cleanup;
  }, [id, windowWidth, windowHeight])
}

export default useDragger;