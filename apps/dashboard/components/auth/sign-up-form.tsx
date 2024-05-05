// react imports
import { useState } from 'react';

// ui imports
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Checkbox } from '@/ui/checkbox';
import { Button } from '@/ui/button';
import {
  ReloadIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons';

// utils
import { signUp } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

// redux imports
import { useAppDispatch } from '@/lib/hooks';
import { createUser, deleteUser } from '@/store/slices/user-store';
import { toast } from 'sonner';

export default function SignUpForm() {
  // redux
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    userEmail: '',
    userPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const validEmail = (emailAddress: string) => {
    return Boolean(!!emailAddress.match(/.+@.+/));
  };

  const isValidPassword = (password: string) => {
    return Boolean(password.length > 8);
  };

  const handleRegistration = async () => {
    // set the loading spinner to true
    setIsLoading(true);

    // try to create the user
    try {
      const user = await signUp(state.userEmail, state.userPassword);

      // For now, redirect the user to the home page
      if (!user) {
        setIsLoading(false);
        return;
      }

      // delete the existing user in the store
      // so we can create the new one
      if (user) {
        dispatch(deleteUser());
      }

      // dispatch the user to the store
      //dispatch(createUser(user.data.user));

      if (!user) return;

      // create the user in the redux store
      dispatch(createUser(user));

      router.push(`/dashboard?uid=${user.id}` ?? '/');

      // reset the loading state
      setIsLoading(false);
    } catch (e) {
      // TODO: add sonner here on error
      toast.error('An error occurred while creating your account');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegistration();
      }}
      className="flex flex-col gap-y-8 bg-[#05050A] border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]"
    >
      <h3 className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
        Your businesses future, starting today.
      </h3>
      {/* input area */}
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1.5">
          <Label
            htmlFor="email"
            className="text-white/80 text-xs font-inter"
          >
            Email Address
          </Label>
          <div className="flex h-10 items-center rounded-md border border-black-50 bg-transparent pl-3 text-sm">
            <EnvelopeClosedIcon className="w-4 h-4 text-white/50" />
            <Input
              id="email"
              type="email"
              name="userEmail"
              placeholder="hello@draggle.com"
              className="
                bg-transparent w-full border-none p-2 placeholder:text-white/50
                focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50
              "
              value={state.userEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Label
            htmlFor="password"
            className="text-white/80 text-xs font-inter"
          >
            Password
          </Label>
          <div className="flex h-10 items-center rounded-md border border-black-50 bg-transparent pl-3 text-sm">
            <LockClosedIcon className="w-4 h-4 text-white/50" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              name="userPassword"
              className="
                bg-transparent w-full border-none p-2 placeholder:text-white/50 focus-visible:outline-none 
                disabled:cursor-not-allowed disabled:opacity-50
              "
              value={state.userPassword}
              onChange={handleChange}
            />
            <button
              className="cursor-pointer px-4 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <EyeOpenIcon className="w-4 h-4" />
              ) : (
                <EyeClosedIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="flex flex-col gap-y-10 mt-5">
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-2">
              <Checkbox
                id="terms"
                className="border border-white rounded-[0.25rem] mt-[2px]"
                checked={acceptedTerms}
                onCheckedChange={(e) => {
                  setAcceptedTerms(!acceptedTerms);
                }}
                required
              />
              <Label
                htmlFor="terms"
                className="text-xs text-white/80"
              >
                By checking this box, you are agreeing to our terms and
                conditions.
              </Label>
            </div>
            <div className="flex gap-x-2">
              <Checkbox
                id="terms"
                className="border border-white rounded-[0.25rem] mt-[2px]"
                checked={acceptedTerms}
                required
              />
              <Label
                htmlFor="terms"
                className="text-xs text-white/80"
              >
                By checking this box, you are agreeing to receive marketing
                emails for draggle
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            {/* submit button */}
            <div className="w-full">
              <Button
                type="submit"
                className="
                  rounded-lg px-4 py-1 w-full
                  duration-300 disabled:cursor-not-allowed 
                  flex gap-x-2 items-center
                "
                disabled={
                  !validEmail(state.userEmail) ||
                  !isValidPassword(state.userPassword) ||
                  !acceptedTerms
                }
                variant="secondary"
              >
                {isLoading ? (
                  <ReloadIcon className="w-3 h-3 animate-spin" />
                ) : (
                  ''
                )}
                Get Started!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
