'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/utils/index"
import { setShowDebugTools, showDebugTools } from '@/store/slices/canvas'

export default function DebugTools() {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(showDebugTools);

  const handleSwitchChange = () => {
    console.log(currentState)
    dispatch(setShowDebugTools(!currentState))
  }

  return (
    <div className="flex items-center gap-x-1 p-2 rounded-3xl absolute bottom-5 right-5 bg-black">
      <Switch 
        id="debug-tools" 
        onCheckedChange={() => handleSwitchChange()} 
      />
      <Label htmlFor="debug-tools" className="text-xs font-satoshi">
        Show debug tools: {currentState ? 'On' : 'Off'}
      </Label>
    </div>
  )
}