'use client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useState } from 'react';


export default function WelcomePageWrapper({
  children
}: Readonly<{ 
  children: React.ReactNode 
}>){
  return (
    <LazyMotion features={domAnimation}>
      <div
        className="
          bg-black-300 border border-black-100 text-white font-inter
          flex flex-col justify-center items-center p-10 rounded-lg
        "
      >
        {children}
      </div>
    </LazyMotion>
  )
}