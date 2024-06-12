'use client';
import { useAppSelector } from "@/utils/index";
import { components } from "@/store/slices/canvas";
import BaseComponent from "../components/base-component";
import { CanvasComponentData } from "@/types/components/CanvasComponents";

export default function Insert(){
  const comps = useAppSelector(components);

  return (
    <div className="flex flex-col gap-y-5 overflow-y-scroll">
      <div className="text-heading-xl"> 
        Insert
      </div>
      {comps.map((component) => {
        return (
          <BaseComponent 
            key={component.name} 
            component={component} 
          >
            {component.type}
          </BaseComponent>
        );
      })}
    </div>
  )
}