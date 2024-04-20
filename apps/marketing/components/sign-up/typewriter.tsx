'use client';
import Typewriter from 'typewriter-effect';

export const TypewriterComponent = ({ strings }: { strings?: string[] }) => {
  return (
    <Typewriter
      options={{
        strings: strings ? strings : ['hours', 'minutes', 'seconds'],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        cursorClassName:
          'Typewriter__cursor text-[30px] md:text-[44px] text-gray-500'
      }}
    />
  );
};
