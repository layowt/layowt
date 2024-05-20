interface position {
  top: number
  left: number
}
/**
 * Util to add the position of an element to each corner 
 * of the element
 */
export const addPositionTagToElement = (
  element: HTMLElement,
) => {
  if(!element) return;
  // get out the top and left values of the element
  const { left, top, bottom, right } = element.getBoundingClientRect()

  // create a new div element to hold the position tags 
  const debugTools = document.createElement('div');

  // add the position tags to the element
  debugTools.innerHTML = `
    <div class="text-black absolute -top-2 -left-2 bg-white p-1 text-xs z-50 border rounded-md">
      <span>top: ${top}</span>
      <span>left: ${left}</span>
    </div>
  `;

  element.appendChild(debugTools);
}