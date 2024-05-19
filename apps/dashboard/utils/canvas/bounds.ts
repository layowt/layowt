interface ScreenSize {
  width: number
  height: number
}

/**
 * Method to detect if the canvas has gone out of the user's viewport
 * 
 * @param canvas 
 * @param screenSize 
 * 
 * @returns boolean
 */
export const detectCanvasOutOfBounds = (
  canvas: HTMLElement, 
  screenSize: ScreenSize,
  wrapperElement: ScreenSize
): boolean => {
  const { height: screenSizeHeight, width: screenSizeWidth } = screenSize
  const { height: wrapperHeight, width: wrapperWidth } = wrapperElement
  
  console.log('canvas', canvas)

  return
}