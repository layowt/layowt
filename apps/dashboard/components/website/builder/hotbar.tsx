import { m as motion, LazyMotion, domAnimation } from "framer-motion";
import { CursorArrowIcon } from "@radix-ui/react-icons";
import { Move } from "lucide-react";

import { recenterCanvas } from "@/utils/canvas/utils";
import { setIsDragged, setMode, canvasMode, CanvasMode, isDragged } from "@/store/slices/canvas";
import { useAppDispatch, useAppSelector } from "@/utils/index";

export default function SiteBuilderRecenterButton({ 
  canvasContainer,
  canvasContainerWrapper
}: {
  canvasContainer: React.RefObject<HTMLDivElement>,
  canvasContainerWrapper: React.RefObject<HTMLDivElement>
}){
  const dispatch = useAppDispatch();
  const mode = useAppSelector(canvasMode);
  const hasBeenDragged = useAppSelector(isDragged)

  const handleRecenterCanvas = (canvasContainer) => {
    // call the recenterCanvas function
    recenterCanvas(canvasContainer, canvasContainerWrapper.current)
    // dispatch the isDragged action to false
    dispatch(setIsDragged(false))
  }

  const items = [
    {
      id: 'move',
      icon: () => (
        <Move
          className="size-3.5"
        />
      ),
      selected: mode === 'move'
    },
    {
      id: 'select',
      icon: () => (
        <CursorArrowIcon
          className="size-3.5"
        />
      ),
      selected: mode === 'select'
    }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="
        bg-black-300 bottom-4 rounded-lg absolute 
        p-2 font-satoshi flex gap-x-3 items-center 
        "
        transition={{ duration: 0.25 }}
        initial={{ bottom: -100 }}
        animate={{ bottom: 10 }}
        aria-label="Site Builder Hotbar"
        >
        <div className="flex items-center gap-x-2">
          {items.map((item) => (
            <button
            key={item.id}
            className={`
            rounded-md p-2
            ${item.selected ? 'bg-black-50' : ''}
            `}
            aria-label={item.id}
            onClick={() => dispatch(setMode(item.id as CanvasMode))}
            >
              <item.icon />
            </button>
          ))}
        </div>
        {hasBeenDragged && (
          <>
            <div className="w-px h-6 bg-black-50"></div>
            <button
              className="font-inter font-medium text-xs bg-black-100 p-2 rounded-md hover:bg-black-50 duration-300"
              aria-label="Recenter the canvas"
              onClick={() => handleRecenterCanvas(canvasContainer.current)}
            >
              Recenter
            </button>
          </>
        )}
      </motion.div>
    </LazyMotion>
  )
}