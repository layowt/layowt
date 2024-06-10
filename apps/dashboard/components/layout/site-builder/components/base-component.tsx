import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function BaseComponent({
  children
}: Props){
  return (
    <div 
      className="
        border border-white p-3 rounded-md flex items-center justify-center
        w-full h-32
      "
    >
      <div className="fill-white flex flex-col gap-y-1 font-satoshi text-sm text-center">
        {children}
      </div>
    </div>
  )
}