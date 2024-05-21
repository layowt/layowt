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
  wrapperElement: HTMLElement,
) => {
  const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = canvas
  const { 
    offsetHeight: wrapperHeight, 
    offsetLeft: wrapperLeft, 
    offsetTop: wrapperTop, 
    offsetWidth: wrapperWidth 
  } = wrapperElement

  console.log(offsetTop)

  // detect if the canvas is out of the wrapper element
  if((offsetTop - 93) < wrapperTop) {
    canvas.style.transition = 'top 0.5s'
    canvas.style.top = `${wrapperTop + 120}px`
  }

  if(offsetLeft < wrapperLeft) {
    canvas.style.transition = 'left 0.5s'
    canvas.style.left = `${wrapperLeft + 20}px`
  }

  if(offsetTop + offsetHeight > wrapperHeight) {
    canvas.style.transition = 'top 0.5s'
    canvas.style.top = `${wrapperHeight - offsetHeight - 20}px`
  }

  if(offsetLeft + offsetWidth > wrapperWidth) {
    canvas.style.transition = 'left 0.5s'
    canvas.style.left = `${wrapperWidth - offsetWidth - 20}px`
  }
}