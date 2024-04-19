'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Typewriter from 'typewriter-effect';

export default function App() {
  return (
    <div className="min-w-[100vw] mx-auto h-screen overflow-hidden">
      <div className="min-h-full w-full bg-[#05050A] bg-dot-white/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#05050A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="flex items-center flex-col justify-center px-3.5 md:px-10  py-4 w-full h-full font-inter">
          <h2 className="text-white text-4xl md:text-6xl font-bold text-center z-20">
            From idea to product, <br />
            <span className="flex items-center gap-x-3 justify-center mt-2">
              in
              <Typewriter
                options={{
                  strings: ['hours', 'minutes', 'seconds'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  cursorClassName:
                    'Typewriter__cursor text-[30px] md:text-[44px]'
                }}
              />
            </span>
          </h2>
          <p className="text-white text-center mt-4 text-sm md:text-lg font-poppins w-3/5 md:w-auto">
            A drag and drop website builder, that{' '}
            <span className="font-semibold text-electric-violet italic">
              actually{'  '}
            </span>
            requires no code.
          </p>
          <div className="flex flex-col gap-y-6 justify-center text-white z-20 w-full md:w-auto">
            <div className="flex flex-col md:flex-row gap-y-4 mt-8 items-center gap-x-4 self-center px-4 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Email"
                className="
                  bg-black min-w-full border-white p-2 md:min-w-80 md:min-h-full
                  focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50
                  text-white placeholder:text-white/85 placeholder:font-poppins placeholder:!leading-relaxed
                  md:max-w-40 
                "
              />
              <Button
                variant="secondary"
                size="lg"
                className="w-full md:w-auto"
              >
                Sign up
              </Button>
            </div>
            <h6 className="font-inter md:text-xl text-center">
              Sign up for early access and get{' '}
              <span className="font-bold">50%</span> off your first month.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
