import React from "react";
import BaseComponent from "./base-component";

export default function DateComponent(){
  return (
    <BaseComponent name="date">
      <span className="font-bold text-xl">
        21:33 pm
      </span>
      <span>
        Timestamp
      </span>
    </BaseComponent>
  )
}