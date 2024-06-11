'use client';
import { useAppSelector } from "@/utils/index";
import { components } from "@/store/slices/canvas";

export default function Insert(){
  const comps = useAppSelector(components);

  return (
    <div className="flex flex-col gap-y-5 overflow-y-scroll">
      <div className="text-heading-xl"> 
        Insert
      </div>
      {comps.map((component) => {
        return (
          <div key={component.name}>
            {component.name}
          </div>
        );
      })}
    </div>
  )
}