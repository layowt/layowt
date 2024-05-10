import { useEffect, useRef } from "react";

interface Window {
	windowWidth: number;
	windowHeight: number;
	elementWrapperWidth?: number
	elementWidth?: number;
	elementHeight?: number;
}

const useDragger = (id: string, opts: Window) => {
	const { windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth } = opts

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
			const minLeft = elementWidth - (windowWidth - elementWidth);
			const maxLeft = windowWidth - (elementWrapperWidth + minLeft);

			// if the current top value of the canvas is less than the max top value
			// of the canvasContainer (the element that is holding the entire 'page')
			// we need to reset the value to the max top value
			if (coords.current.lastY < maxTop) {
				// add the transition back to smoothly recenter the canvas
				target.style.transition = 'top 0.5s';
				target.style.top = `${maxTop + 20}px`;
				coords.current.lastY = maxTop + 20;

				// remove the transition after the animation is complete
				setTimeout(() => {
					target.style.transition = 'none';
				}, 500);
			}

			// if the element's top value is greater than its entire height 
			// minus the height of the canvasContainer, we need to reset the value
			// as it's outside of the viewport
			if(coords.current.lastY > maxBottom){
				// add the transition back to smoothly recenter the canvas
				target.style.transition = 'top 0.5s';
				target.style.top = `${maxBottom}px`;
				coords.current.lastY = maxBottom;

				// remove the transition after the animation is complete
				setTimeout(() => {
					target.style.transition = 'none';
				}, 500);
			}

			
			if(coords.current.lastX < minLeft){
				// add the transition back to smoothly recenter the canvas
				target.style.transition = 'left 0.5s';
				target.style.left = `${minLeft}px`;
				coords.current.lastX = minLeft;
				// remove the transition after the animation is complete
				setTimeout(() => {
					target.style.transition = 'none';
				}, 500);
			}

			// 'maxRight' is the maximum value that 'left' can be
			if(coords.current.lastX > maxLeft){
				// add the transition back to smoothly recenter the canvas
				target.style.transition = 'left 0.5s';
				target.style.left = `${minLeft}px`;
				coords.current.lastX = minLeft;

				// remove the transition after the animation is complete
				setTimeout(() => {
					target.style.transition = 'none';
				}, 500);
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
  }, [id, windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth])
}

export default useDragger;