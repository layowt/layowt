'use client';

import Link from 'next/link';
import { Button } from '@layowt/components/src/ui/button';
import { InputWithLabel } from '@layowt/components/src/ui/input-label';
import { m as motion } from 'framer-motion';
import { useState } from 'react';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useHash } from './welcome-wrapper';
import { onboardingSchema } from '@/lib/zod/schemas/onboarding';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@layowt/components/src/ui/form';

type SchemaProps = z.infer<typeof onboardingSchema>;

export default function WelcomePageDetails() {
  const { 
    handleSubmit, 
    register, 
    formState: { 
      errors 
    },
    getValues,
    control
  } = useForm<SchemaProps>({
    resolver: zodResolver(onboardingSchema),
  });

  const { updateHash } = useHash();

  function onSubmit(values: z.infer<typeof onboardingSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    updateHash('#payment-plans');
  }

  const form = useForm<SchemaProps>({
    resolver: zodResolver(onboardingSchema),
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
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="grid grid-cols-12 gap-4 w-96 mt-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormControl>
                <>
                  <InputWithLabel
                    wrapperclassname="col-span-6"
                    label="First name"
                    type="text"
                    placeholder="John"
                    {...field}
                  />
                  <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>

                  <InputWithLabel 
                    label="Last name"
                    name="lastName"
                    type="text"
                    className="bg-black-300 w-full"
                    wrapperclassname="col-span-6"
                    placeholder="Doe"
                  />
                  <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>

                  <InputWithLabel
                    label="Display name"
                    name="displayName"
                    type="text"
                    className="bg-black-300 w-full"
                    wrapperclassname="col-span-12"
                    placeholder={
                      getValues('firstName') && getValues('lastName') ?  
                      `${getValues('firstName')} ${getValues('lastName')}`.toLowerCase() :
                      'John_Doe'.toLowerCase()
                    }
                    question={{
                      icon: (
                        <QuestionMarkCircledIcon />
                      ),
                      text: 'Your display name is how you will appear when publishing blogs posts.'
                    }}
                  />
                  <FormMessage>{form.formState.errors.displayName?.message}</FormMessage>
                  
                  <div className="col-span-12">
                    <Button
                      variant="default"
                      type="submit"
                      disabled={!getValues('firstName') || !getValues('lastName') || !getValues('displayName')}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              </FormControl>
            )}
          >
          </FormField>
        </form>
      </Form>
      {/* <form
        className="grid grid-cols-12 gap-4 w-96 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWithLabel 
          label="First name"
          name="firstName"
          type="text"
          className="bg-black-300 w-full"
          wrapperclassname="col-span-6"
          placeholder="John"
          control={control}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        
        <InputWithLabel 
          label="Last name"
          name="lastName"
          type="text"
          className="bg-black-300 w-full"
          wrapperclassname="col-span-6"
          placeholder="Doe"
          control={control}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        
        <InputWithLabel
          label="Display name"
          name="displayName"
          type="text"
          className="bg-black-300 w-full"
          wrapperclassname="col-span-12"
          placeholder={
            getValues('firstName') && getValues('lastName') ?  
            `${getValues('firstName')} ${getValues('lastName')}`.toLowerCase() :
            'John_Doe'.toLowerCase()
          }
          question={{
            icon: (
              <QuestionMarkCircledIcon />
            ),
            text: 'Your display name is how you will appear when publishing blogs posts.'
          }}
          control={control}
        />
        {errors.displayName && <p>{errors.displayName.message}</p>}

        {getValues('firstName') && getValues('lastName') }
        
        <div className="col-span-12">
          <Button
            variant="default"
            type="submit"
            disabled={!getValues('firstName') || !getValues('lastName') || !getValues('displayName')}
          >
            Continue
          </Button>
        </div>
      </form> */}
    </>
  );
}
