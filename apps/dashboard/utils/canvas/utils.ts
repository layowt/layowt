export const setCanvasZoom = (
  event: React.WheelEvent<HTMLDivElement>,
  zoom: number = 1
): number => {
  zoom += event.deltaY * -0.01
  return Math.min(Math.max(0.1, zoom), 4)
}