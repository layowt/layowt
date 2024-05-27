import { useAppSelector } from "@/utils/index";
import { showDebugTools } from "@/store/slices/canvas";

/**
 * Hook to change the global state of the debug tools
 * 
 * @returns {boolean} debugTools
 */
const useDebugTools = () => {
  const debugTools = useAppSelector(showDebugTools);
  return debugTools;
}
export default useDebugTools;