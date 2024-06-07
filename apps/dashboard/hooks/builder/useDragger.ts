import { useEffect, useRef } from "react";
import { addPositionTagToElement } from "@/utils/canvas/debug";
import { useAppDispatch } from "@/utils/index";
import { setIsDragged } from "@/store/slices/canvas";

interface Window {
  windowWidth: number;
  windowHeight: number;
  elementWrapperWidth?: number;
  elementWidth?: number;
  elementHeight?: number;
}

const useDragger = (element: HTMLElement, opts: Window, canBeDragged: boolean) => {
  const { windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth } = opts;

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
  });

  useEffect(() => {
    if (!element || !canBeDragged) return;

    const container = element.parentElement;
    if (!container) throw new Error("element must have a parent");

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = element.offsetLeft;
      coords.current.lastY = element.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      dispatch(setIsDragged(true));

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      element.style.top = `${nextY}px`;
      element.style.left = `${nextX}px`;

      addPositionTagToElement(element);
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    return () => {
      element.removeEventListener('mousedown', onMouseDown);
      element.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [element, canBeDragged, windowWidth, windowHeight, elementHeight, elementWidth, elementWrapperWidth]);

  return { isDragged: isDragged.current };
};

export default useDragger;
