export const addPositionTagToElement = (element) => {
  if (!element) return;

  // Get the bounding client rectangle of the element
  const { left, top, right, bottom, width, height } = element.getBoundingClientRect();

  // Define a function to create or update debug tools
  const updateDebugTool = (selector, positionClass, content) => {
    let debugTool = element.querySelector(selector);
    if (debugTool) {
      // Update the content of the existing debug tool
      debugTool.innerHTML = content;
    } else {
      // Create a new div element if it doesn't exist
      debugTool = document.createElement('div');
      debugTool.className = `text-black absolute ${positionClass} bg-white p-1 text-xs border rounded-md ${selector.slice(1)}`;
      debugTool.innerHTML = content;
      element.appendChild(debugTool);
    }
  };

  // Update or create debug tools for each corner
  updateDebugTool('.debug-tool-top-left', 'top-0 left-0', `
    <span>top: ${top}</span>
    <span>left: ${left}</span>
  `);
  
  updateDebugTool('.debug-tool-top-right', 'top-0 left-full right-0', `
    <span>top: ${top}</span>
    <span>right: ${right}</span>
  `);
  
  updateDebugTool('.debug-tool-bottom-left', 'bottom-0 left-0', `
    <span>bottom: ${bottom}</span>
    <span>left: ${left}</span>
  `);
  
  updateDebugTool('.debug-tool-bottom-right', 'top-full bottom-0 bottom-0 right-0', `
    <span>bottom: ${bottom}</span>
    <span>right: ${right}</span>
  `);
};
