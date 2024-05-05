'use client';
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
  ReloadIcon
} from '@radix-ui/react-icons';
import { Label } from '@/ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { login } from '@/utils/user/user-login';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await login(state.userEmail, state.userPassword);

      // redirect to the dashboard if the user is logged in
      toast.success('Welcome back, ' + user?.user.email + '!');

      router.push('/dashboard');
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="flex flex-col gap-y-8 bg-[#05050A] border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]"
    >
      <h3 className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
        Welcome back!
      </h3>
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
          <div className="flex flex-col gap-y-8 mt-6">
            {/* submit button */}
            <div className="w-full">
              <Button
                type="submit"
                className="
										rounded-lg px-4 py-1 w-full
										duration-300 disabled:cursor-not-allowed 
										flex gap-x-2 items-center
									"
                variant="secondary"
              >
                {isLoading ? (
                  <ReloadIcon className="w-3 h-3 animate-spin" />
                ) : (
                  ''
                )}
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
