import type { CanvasComponentData, CanvasComponents } from "@/types/components/CanvasComponents";
import div from '@/components/layout/site-builder/components/div'

/**
 * Generate an element and place on the canvas
 * 
 * @param component - The component data containing type and properties
 */
export const generateElement = <T extends CanvasComponentData>(component: T) => {
  const {
    id,
    style,
    children,
    dataLayowtType,
    dataLayowtContainer,
    innerHTML,
  } = component.data;

  
};
