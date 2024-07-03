'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
  ReloadIcon
} from '@radix-ui/react-icons';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Button } from '~/packages/components/ui/button';
import { getWebsite } from '@/actions/websites/get-website';
import { login } from '@/actions/user/user-login';
import { toast } from 'sonner';
import { ERROR_CODES } from '@/utils/constants/error-codes';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams?.get('r');
  const redirect = searchParams?.get('redirect');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(false);

  useEffect(() => {
    if (toastRef.current) return;
    toastRef.current = true;

    if (!reason) return;

    toast.error(ERROR_CODES[reason]?.title ?? ERROR_CODES[reason], {
      description: ERROR_CODES[reason]?.description,
      duration: 5000,
      position: 'bottom-right',
    });
  }, [reason]);

  const [state, setState] = useState({
    userEmail: '',
    userPassword: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const checkUserCanAccessSite = async (userId) => {
    const siteId = searchParams?.get('siteId');
    if (!siteId) return;

    const canAccessSite = await getWebsite({
      websiteId: siteId,
      userId
    });

    if (!canAccessSite?.websiteId) {
      return router.push('/dashboard?r=unauthorized-site-access');
    }
    return router.push(`/site/${siteId}`);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const siteId = searchParams?.get('siteId');
    try {
      const user = await login(state.userEmail, state.userPassword);

      if (!user) throw new Error('No user found');

      if (reason === 'admin' && siteId) {
        return await checkUserCanAccessSite(user.user.id);
      }

      toast.success('Welcome back, ' + user?.user.email + '!');

      if(redirect)
        return router.push(redirect)
      
      return router.push('/dashboard');
    } catch (e) {
      setIsLoading(false);
      toast.error('Invalid email or password. Please try again.');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="flex flex-col gap-y-8 bg-black-300 border border-black-50 rounded-xl py-12 px-8 w-80 lg:w-[450px]"
    >
      <h3 className="animate-text text-3xl flex justify-center w-full text-center font-semibold bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
        Welcome back{reason === 'admin' ? `  ${reason}` : ''}!
      </h3>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1.5">
          <Label
            htmlFor="email"
            className="text-white/80 text-xs font-inter"
          >
            Email Address
          </Label>
          <div className="flex h-10 items-center rounded-md bg-transparent text-sm relative">
            <EnvelopeClosedIcon className="size-4 text-white/50 absolute ml-3" />
            <Input
              id="email"
              type="email"
              name="userEmail"
              placeholder="hello@layowt.com"
              className="
                bg-transparent w-full p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
                focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-10
                hover:border-white/50
              "
              value={state.userEmail}
              onChange={handleChange}
              autoComplete="email"
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
          <div className="flex h-10 items-center rounded-md bg-transparent text-sm relative">
            <LockClosedIcon className="size-4 text-white/50 absolute ml-3" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              name="userPassword"
              className="
              bg-transparent w-full p-2 placeholder:text-white/50 autofill:!bg-transparent border border-black-50
              focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 px-10
              hover:border-white/50
              "
              value={state.userPassword}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="cursor-pointer px-4 transition-all duration-300 absolute right-0"
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
          <Link
            href="/forgot-password"
            className="text-xs text-white/80 hover:text-white"
          >
            <span>Forgot your password?</span>
          </Link>
          <div className="flex flex-col gap-y-8 mt-6">
            <div className="w-full">
              <Button
                type="submit"
                className="
                  rounded-lg px-4 py-1 w-full
                  duration-300 disabled:cursor-not-allowed 
                  flex gap-x-2 items-center
                "
                variant="default"
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
