export const setCanvasZoom = (
  event: React.WheelEvent<HTMLDivElement>,
  zoom: number
): number => {
  zoom += event.deltaY * -0.01
  return Math.min(Math.max(0.125, zoom), 4)
}