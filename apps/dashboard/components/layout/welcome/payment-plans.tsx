import { m as motion } from 'framer-motion';
import Back  from '@layowt/components/src/back';

export default function WelcomePagePaymentPlans({ 
  updateHash 
}: { 
  updateHash: (newHash: string) => void 
}){

  return (
    <>
      <Back 
        onClick={() => updateHash('#details')}
        className="absolute top-4 left-4" 
      />
      <motion.h1
        className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        Payment plans
      </motion.h1>
    </>
  )
}