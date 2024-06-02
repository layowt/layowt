export const setCanvasZoom = (
  event: React.WheelEvent<HTMLDivElement>,
  zoom: number
): number => {
  zoom += event.deltaY * -0.01
  return Math.min(Math.max(0.125, zoom), 4)
}

/**
 * Util to center the canvas in the viewport
 * 
 * @param canvasContainer 
 */
export const recenterCanvas = (
  canvasContainer: HTMLDivElement | null,
  canvasContainerWrapper: HTMLDivElement | null
) => {
  if(!canvasContainer || canvasContainerWrapper) return

  // reset the position of the canvas by getting the
  

  // reset the zoom
  canvasContainer.style.transform = 'scale(1)'
}