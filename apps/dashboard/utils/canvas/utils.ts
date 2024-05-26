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
) => {
  if(!canvasContainer) return

  // remove the left and top attributes on the canvasContainer
  // this will recenter the canvas in the viewport

  // reset the left and top attributes
  canvasContainer.style.left = ''
  canvasContainer.style.top = ''

  // reset the zoom
  canvasContainer.style.transform = 'scale(1)'
}