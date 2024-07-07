import Link from 'next/link';
import { InputWithLabel } from '~/packages/components/ui/input-label';

export default function WelcomePageDetails(){
  return (
    <div
      className="
        bg-black-300 border border-black-100 text-white font-inter
        flex flex-col justify-center items-center p-10 rounded-lg
      "
    >
      <div className="flex flex-col gap-y-2 text-center items-center">
        <h1 className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
          Account details
        </h1>
        <Link 
          href="/"
          prefetch
          className="text-xs underline underline-offset-2 hover:text-white/60 font-satoshi"
        >
          What do you do with my data?
        </Link>
      </div>
      <form
        className="flex flex-col gap-y-4 w-64 mt-8"
      >
        <InputWithLabel 
          label="First Name"
          name="firstName"
          value=""
          type="text"
          onChange={() => {}}
          className="bg-black-300 w-full"
        />
      </form>
  </div>
  )
}