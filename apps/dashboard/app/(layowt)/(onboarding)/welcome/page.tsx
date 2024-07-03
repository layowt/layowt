'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from '~/packages/components/ui/button';
import { FlipWords } from '~/packages/components/ui/flip-words'

export default function WelcomePage(){
  const words = ['websites', 'online stores', 'businesses'];

  return (
    <div className="text-white font-satoshi flex flex-col gap-y-2 min-h-full w-full bg-black-300 bg-dot-white/[0.2] relative items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="text-4xl font-bold text-center">
        Create exceptional 
        <FlipWords 
          words={words} 
          className="text-white" 
        /> <br />
        effortlessly with Layowt.
      </h1>
      <div className="max-w-80 text-center">
        The all-in-one platform <br /> to build visually stunning user expierences.
      </div>
      <Button 
        variant='default'
        arrow
        fontSize='lg'
        padding='xl'
        href="/welcome"
      >
        Get started
      </Button>
    </div>
  )
}