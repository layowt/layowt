import { useEffect, useRef } from "react";
import { addPositionTagToElement } from "@/utils/canvas/debug";
import { useAppDispatch } from "@/utils/index";
import { setIsDragged } from "@/store/slices/canvas";

interface Window {
	windowWidth: number;
	windowHeight: number;
	elementWrapperWidth?: number
	elementWidth?: number;
	elementHeight?: number;
}

const useDragger = (element: HTMLElement, opts: Window) => {
	const { windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth } = opts

	const dispatch = useAppDispatch();

  const isClicked = useRef(false);
	const isDragged = useRef(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 100,
    startY: 100,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {
		if(!element) return;

    const container = element.parentElement;
    if (!container) throw new Error("element element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

			//console.log('e.clientX', e.clientX)
    }

    const onMouseUp = (e: MouseEvent) => {
			isClicked.current = false;
			coords.current.lastX = element.offsetLeft;
			coords.current.lastY = element.offsetTop;

			// const maxTop = windowHeight - elementHeight;
			// const maxBottom = windowHeight - elementHeight;
			// const minLeft = elementWidth - (windowWidth - elementWidth);
			// const maxLeft = windowWidth - (elementWrapperWidth + minLeft);

			// if the current top value of the canvas is less than the max top value
			// of the canvasContainer (the element that is holding the entire 'page')
			// we need to reset the value to the max top value
			// if (coords.current.lastY < maxTop) {
			// 	// add the transition back to smoothly recenter the canvas
			// 	// element.style.transition = 'top 0.5s';
			// 	// element.style.top = `${maxTop + 20}px`;
			// 	// coords.current.lastY = maxTop + 20;

			// 	// // remove the transition after the animation is complete
			// 	// setTimeout(() => {
			// 	// 	element.style.transition = 'none';
			// 	// }, 500);
			// }

			// // if the element's top value is greater than its entire height 
			// // minus the height of the canvasContainer, we need to reset the value
			// // as it's outside of the viewport
			// if(coords.current.lastY > maxBottom){
			// 	// add the transition back to smoothly recenter the canvas
			// 	// element.style.transition = 'top 0.5s';
			// 	// element.style.top = `${maxBottom}px`;
			// 	// coords.current.lastY = maxBottom;

			// 	// // remove the transition after the animation is complete
			// 	// setTimeout(() => {
			// 	// 	element.style.transition = 'none';
			// 	// }, 500);
			// }

			
			// if(coords.current.lastX < minLeft){
			// 	// add the transition back to smoothly recenter the canvas
			// 	// element.style.transition = 'left 0.5s';
			// 	// element.style.left = `${minLeft}px`;
			// 	// coords.current.lastX = minLeft;
			// 	// // remove the transition after the animation is complete
			// 	// setTimeout(() => {
			// 	// 	element.style.transition = 'none';
			// 	// }, 500);
			// }

			// // 'maxRight' is the maximum value that 'left' can be
			// if(coords.current.lastX > maxLeft){
			// 	// add the transition back to smoothly recenter the canvas
			// 	// element.style.transition = 'left 0.5s';
			// 	// element.style.left = `${minLeft}px`;
			// 	// coords.current.lastX = minLeft;

			// 	// // remove the transition after the animation is complete
			// 	// setTimeout(() => {
			// 	// 	element.style.transition = 'none';
			// 	// }, 500);
			// }
    }

		// issue is here
    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

			// set the dragged state to true
			dispatch(setIsDragged(true));

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      element.style.top = `${nextY}px`;
      element.style.left = `${nextX}px`;

			addPositionTagToElement(element);
    }

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }
    return cleanup;
  }, [element, windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth])

	return { isDragged: isDragged.current };
}

export default useDragger;