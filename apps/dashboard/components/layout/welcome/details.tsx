'use client';
import Link from 'next/link';
import { Button } from '@layowt/components/src/ui/button';
import { InputWithLabel } from '@layowt/components/src/ui/input-label';
import { m as motion } from 'framer-motion';
import { useState } from 'react';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export default function WelcomePageDetails ({ 
  updateHash 
}: { 
  updateHash: (newHash: string) => void 
}) {
  const [details, setDetails] = useState<{
    firstName: string;
    lastName: string;
    displayName: string;
  }>({
    firstName: '',
    lastName: '',
    displayName: ''
  });

  return (
    <>
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
          value={details.firstName}
          type="text"
          onChange={(e) => setDetails({...details, firstName: e.target.value })}
          className="bg-black-300 w-full"
          wrapperclassname="col-span-6"
          placeholder="John"
        />
        <InputWithLabel 
          label="Last name"
          name="lastName"
          value={details.lastName}
          type="text"
          onChange={(e) => setDetails({...details, lastName: e.target.value })}
          className="bg-black-300 w-full"
          wrapperclassname="col-span-6"
          placeholder="Doe"
        />
        <InputWithLabel
          label="Display name"
          name="displayName"
          value={details.displayName}
          type="text"
          onChange={(e) => setDetails({...details, displayName: e.target.value })}
          className="bg-black-300 w-full"
          wrapperclassname="col-span-12"
          placeholder={
            details.firstName && details.lastName ?  
            `${details.firstName} ${details.lastName}`.toLowerCase() :
            'John_Doe'.toLowerCase()
          }
          question={{
            icon: (
              <QuestionMarkCircledIcon />
            ),
            text: 'Your display name is how you will appear when publishing blogs posts.'
          }}
        />
          
        <div className="col-span-12">
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              updateHash('#payment-plans');
            }}
            disabled={!details.firstName || !details.lastName || !details.displayName}
          >
            Continue
          </Button>
        </div>
      </form>
    </>
  );
};
