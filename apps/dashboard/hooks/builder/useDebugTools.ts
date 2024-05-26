import { useAppSelector } from "@/utils/index";
import { showDebugTools } from "@/store/slices/canvas";

const useDebugTools = () => {
  const debugTools = useAppSelector(showDebugTools);
  return debugTools;
}
export default useDebugTools;