'use client'
import { useEffect, useState } from 'react';
import AuthenticationCardWrapper from './form-wrapper';
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/ui/button';
import { resendVerificationEmail } from '@/utils/user';
import useInterval from '@/hooks/useInterval';
import { toast } from 'sonner';

export default function AuthenticationCard(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [seconds, setSeconds] = useState(5);

  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  const handleAuthenticationSubmit = () => {
    // Handle form submission
  }

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (!emailParam) {
      router.push('/login');
    } else {
      setEmail(emailParam);
    }
  }, [router, searchParams]);

  const handleResendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('No email found');
      return;
    }
    try {
      const { promise } = await resendVerificationEmail(email);
      interval.start();
      toast.promise(promise, {
        loading: 'Sending verification email...',
        success: `Check your inbox at ${email} to verify your email.`,
        error: 'Failed to send verification email.',
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto'
        }
      });
    } catch (error) {
      toast.error('Error resending verification email');
    }
  }

  return (
    <AuthenticationCardWrapper 
      onSubmit={handleAuthenticationSubmit} 
      className="text-white font-satoshi justify-center items-center lg:w-[500px]"
    >
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-heading-3xl">
          Waiting for authentication
        </h1>
        <div className="flex flex-col gap-y-4 text-center inter-text-sm">
          In order to check you are a real human, please go to {email} and click the link in the email.
        </div>
        <Button 
          className='mt-4 w-full'
          variant='secondary'
          onClick={handleResendEmail}
          special={false}
        >
          Resend email
        </Button>
      </div>
    </AuthenticationCardWrapper>
  )
}
