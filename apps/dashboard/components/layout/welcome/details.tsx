'use client';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
// components
import { Button } from '@layowt/components/src/ui/button';
import { InputWithLabel } from '@layowt/components/src/ui/input-label';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@layowt/components/src/ui/form';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { 
  Select, 
  SelectContent, 
  SelectTrigger, 
  SelectItem, 
  SelectGroup,
  SelectValue
} from '@layowt/components/src/ui/select';

import { useHashContext } from './welcome-wrapper-context';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from '@/lib/zod/schemas/onboarding';
import { z } from 'zod';
import { getUserFromSession } from '@/actions/user/get-user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { experienceLevel } from '@prisma/client';

type SchemaProps = z.infer<typeof onboardingSchema>;

export default function WelcomePageDetails() {
  const { setHash, userOnboardingDetails } = useHashContext();

  // define the form
  const form = useForm<SchemaProps>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      displayName: '',
      experienceLevel: 'businessOwner'
    }
  });

  const expierenceLevels = {
    'business-owner': 'Business owner',
    'developer': 'Developer',
    'designer': 'Designer',
    'marketer': 'Marketer',
    'student': 'Student',
    'other': 'Other'
  }


  const {
    data: { data: user } = {},
    mutateAsync: server_getUser, // mutateAsync as this is an async function! (ref: https://www.youtube.com/watch?v=8K1N3fE-cDs&ab_channel=CosdenSolutions)
    isPending
  } = useMutation({ 
    mutationFn: getUserFromSession,
    onSuccess: ({ data: data }) => {
      // update the context with the user's details
      userOnboardingDetails.id = data.user.id;
      // log
      console.log(data)

      // update the hash to move to the next screen
      setHash('#payment-plans');
    },
    onError: (error) => {
      console.error(error);
      // show an error toast
      toast.error('There was an error fetching your user details');
      // send the user back to the first screen
      setHash('#details');
    }
  });

  // Handle form submission
  const onSubmit = (values: SchemaProps) => {
    // call the method to grab the user from the server
    server_getUser();
    // update the context with the user's details
    userOnboardingDetails.firstName = values.firstName;
    userOnboardingDetails.lastName = values.lastName;
    userOnboardingDetails.displayName = values.displayName;
    userOnboardingDetails.experienceLevel = values.experienceLevel;

    console.log({
      userOnboardingDetails
    })
  }

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
          {/** First name field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormControl>
                <div className="col-span-6">
                  <InputWithLabel
                    label="First name"
                    type="text"
                    placeholder="John"
                    {...field}
                  />
                  <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          {/** Last name field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormControl>
                <div className="col-span-6">
                  <InputWithLabel
                    label="Last name"
                    type="text"
                    placeholder="Doe"
                    {...field}
                  />
                  <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          {/** Display name field */}
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormControl>
                <div className="col-span-12">
                  <InputWithLabel
                    label="Display name"
                    type="text"
                    placeholder="John Doe"
                    question={{
                      text: 'This is the name that will be displayed to other users.',
                      icon: <QuestionMarkCircledIcon />
                    }}
                    {...field}
                  />
                  <FormMessage>{form.formState.errors.displayName?.message}</FormMessage>
                </div>
              </FormControl>
            )}
          />
          {/** expierence level */}
          <div className="col-span-full">
            <Select
              onValueChange={(value: experienceLevel) => form.setValue('experienceLevel', value)}
            >
              <SelectTrigger className="bg-black-100 border border-black-300 font-satoshi">
                <SelectValue placeholder="What is your technical background?" />
              </SelectTrigger>
              <SelectContent className="bg-black-100 text-white border border-black-300 font-satoshi">
                {Object.entries(expierenceLevels).map(([key, value]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="flex items-center hover:bg-black-50"

                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/** Submit button */}
          <div className="col-span-12">
            <Button
              variant="default"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
