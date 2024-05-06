'use client';
import SignUpForm from './sign-up-form';

/**
 * Renders the sign-up component.
 *
 * @returns The sign-up component JSX.
 */
export default function SignUpComponent() {
  return (
    <div className="flex flex-col gap-y-4 h-screen items-center justify-center text-white px-10">
      <SignUpForm />
      <span className="text-white/60 text-xs">See why people love Layowt:</span>
    </div>
  );
}
