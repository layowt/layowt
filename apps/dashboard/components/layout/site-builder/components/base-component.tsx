import { CanvasComponentData } from "@/types/components/CanvasComponents";
import { generateElement } from "@/utils/canvas/components/generate";
import React from "react";

interface Props {
  children: React.ReactNode;
  component: CanvasComponentData;
}

export default function BaseComponent({
  children,
  component
}: Props){
  const { type } = component

  return (
    <button 
      className="
        border border-white p-3 rounded-xl flex items-center justify-center
        w-full h-32 group relative font-satoshi
      "
      onClick={() => generateElement(component)}
    >
      <div className="fill-white flex flex-col gap-y-1 text-sm text-center group-hover:opacity-50">
        {children}
      </div>
      <div 
        className="
          z-20 opacity-0 group-hover:opacity-100 absolute bg-white 
          text-black px-4 py-2 rounded-md text-xs
        "
      >
        Add {type}
      </div>
    </button>
  )
}