'use client'
import { Button } from '~/packages/components/src/ui/button';
import { FlipWords } from '~/packages/components/ui/flip-words'
import { m as motion, LazyMotion, domAnimation } from 'framer-motion'

export default function Welcome(){
  const words = ['solutions', 'storefronts', 'companies'];

  return (
    <LazyMotion features={domAnimation}>
      <div className="text-white font-satoshi flex flex-col gap-y-7 min-h-full w-full bg-black-300 bg-dot-white/[0.2] relative items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-300 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col gap-y-4 items-center w-1/2">
          <h1 
            className="text-5xl font-bold text-center" 
            aria-label="Create expeptional user expierences with Layowt."
          >
            <span className='inline-block'>
              Create exceptional
            </span>
            <br />
            <FlipWords 
              words={words} 
              className="text-white" 
            /> <br />
            effortlessly with Layowt.
          </h1>
          <motion.p 
            className="max-w-96 text-center text-xl relative"
            initial={{ bottom: 10, opacity: 0 }}
            animate={{ bottom: 0, opacity: 100 }}
            transition={{ duration: 0.25 }}
          >
            The all-in-one platform <br /> to build visually stunning user expierences.
          </motion.p>
        </div>
        <motion.div
          className="relative"
          initial={{ bottom: 10, opacity: 0 }}
          animate={{ bottom: 0, opacity: 100 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <Button 
            variant='default'
            href="/welcome?onboarding=details"
            fontSize='lg'
            padding='xl'
          >
            Get started
          </Button>
        </motion.div>
      </div>
    </LazyMotion>
  )
}