import { motion } from "framer-motion";
import { recenterCanvas } from "@/utils/canvas/utils";
import { setIsDragged } from "@/store/slices/canvas";
import { useAppDispatch } from "@/utils/index";

export default function SiteBuilderRecenterButton({ 
  canvasContainer 
}: {
  canvasContainer: React.RefObject<HTMLDivElement>
}){
  const dispatch = useAppDispatch()

  const handleRecenterCanvas = (canvasContainer) => {
    // call the recenterCanvas function
    recenterCanvas(canvasContainer)
    // dispatch the isDragged action to false
    dispatch(setIsDragged(false))
  }

  return (
    <motion.button
      className="
        bottom-5 bg-electric-violet-500 rounded-md absolute 
        px-5 py-2 font-satoshi font-medium 
      "
      aria-label='Recenter the canvas'
      transition={{ duration: 0.25 }}
      initial={{ bottom: -10 }}
      animate={{ bottom: 10 }}
      onClick={() => handleRecenterCanvas(canvasContainer.current)}
    >
      Recenter
    </motion.button>
  )
}