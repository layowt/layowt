'use client'
import useDebugTools from "@/hooks/builder/useDebugTools";

const roundNum = (num) => Math.round(num * 100) / 100;

export const addPositionTagToElement = (element) => {
  //const showDebugTools = useDebugTools();
  // If the debug tools are not enabled, return early
  //if(!showDebugTools) return;

  if (!element) return;
  // Get the bounding client rectangle of the element
  const { left, top, right, bottom } = element.getBoundingClientRect();

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
    <span>top: ${roundNum(top)}</span>
    <span>left: ${roundNum(left)}</span>
  `);
  
  updateDebugTool('.debug-tool-top-right', 'top-0 right-0', `
    <span>top: ${roundNum(top)}</span>
    <span>right: ${roundNum(right)}</span>
  `);
  
  updateDebugTool('.debug-tool-bottom-left', 'bottom-0 left-0', `
    <span>bottom: ${roundNum(bottom)}</span>
    <span>left: ${roundNum(left)}</span>
  `);
  
  updateDebugTool('.debug-tool-bottom-right', 'bottom-0 right-0', `
    <span>bottom: ${roundNum(bottom)}</span>
    <span>right: ${roundNum(right)}</span>
  `);
};
