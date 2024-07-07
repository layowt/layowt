import Link from 'next/link';
import { Button } from '~/packages/components/ui/button';
import { InputWithLabel } from '~/packages/components/ui/input-label';
import { m as motion, LazyMotion, domAnimation } from 'framer-motion'

export default function WelcomePageDetails(){
  return (
    <LazyMotion features={domAnimation}>
      <div
        className="
          bg-black-300 border border-black-100 text-white font-inter
          flex flex-col justify-center items-center p-10 rounded-lg
        "
      >
        <div className="flex flex-col gap-y-2 text-center items-center">
          <motion.h1 
            className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            Account details
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
          >
            <Link 
              href="/"
              prefetch
              className="text-xs underline underline-offset-2 hover:text-white/60 font-satoshi"
              >
              What do you do with my data?
            </Link>
          </motion.div>
        </div>
        <form
          className="grid grid-cols-12 gap-4 w-96 mt-8"
        >
          <InputWithLabel 
            label="First name"
            name="firstName"
            value=""
            type="text"
            onChange={() => {}}
            className="bg-black-300 w-full"
            wrapperClassName='col-span-6'
          />
          <InputWithLabel 
            label="Last name"
            name="lastName"
            value=""
            type="text"
            onChange={() => {}}
            className="bg-black-300 w-full"
            wrapperClassName='col-span-6'
          />
          <InputWithLabel
            label="Display name"
            name="displayName"
            value=""
            type="text"
            onChange={() => {}}
            className="bg-black-300 w-full"
            wrapperClassName='col-span-12'
          />

          <div className="col-span-12">
            <Button
              variant="default"
              >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </LazyMotion> 
  )
}