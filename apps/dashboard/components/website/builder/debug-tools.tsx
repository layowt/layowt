'use client'

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/utils/index"
import { setShowDebugTools } from '@/store/slices/canvas'

export default function DebugTools() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-y-2 absolute top-full left-full bottom-5 right-5">
      <Label htmlFor="debug-tools">
        Show debug tools
      </Label>
      <Switch id="debug-tools" />
    </div>
  )
}