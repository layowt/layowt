// react imports
import { useState } from 'react';

// ui imports
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { ReloadIcon } from '@radix-ui/react-icons';

// utils
import { SignUp } from '@/src/utils/firebase';
import { useRouter } from 'next/navigation';

// redux imports
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { createUser, deleteUser } from '@/store/user-store';
import type { User } from 'firebase/auth';

export default function SignUpForm() {
  // redux
  const dispatch = useAppDispatch();

  // user states
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // other states
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();

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
      const user = await SignUp(userEmail, userPassword);

      // For now, redirect the user to the home page
      if (!user) return;

      // push the user to the desired location

      // delete the existing user in the store
      // so we can create the new one
      if (user) {
        dispatch(deleteUser());
      }

      const serializedUser: Partial<User> = {
        displayName: user.displayName,
        email: user.email ?? undefined,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        metadata: { ...user.metadata },
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        uid: user.uid
      };

      // dispatch the user to the store
      dispatch(createUser(serializedUser));

      router.push('/pricing');

      // reset the loading state
      setIsLoading(false);
    } catch (e) {
      // TODO: add sonner here on error
      console.error(e);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistration();
        }}
        className="flex flex-col font-cairo gap-y-8 bg-white/5 rounded-xl p-7 w-80 lg:w-96"
      >
        <h3 className="text-3xl flex justify-center w-full">
          Create an account
        </h3>
        {/* input area */}
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex h-10 items-center rounded-md border border-input bg-transparent pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.615 19q-.69 0-1.152-.462Q3 18.075 3 17.385V6.615q0-.69.463-1.152Q3.925 5 4.615 5h14.77q.69 0 1.152.463q.463.462.463 1.152v10.77q0 .69-.462 1.152q-.463.463-1.153.463zM20 6.885l-7.552 4.944q-.106.056-.214.093T12 11.96q-.125 0-.234-.038t-.214-.093L4 6.885v10.5q0 .269.173.442t.442.173h14.77q.269 0 .442-.173t.173-.442zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z"
                  ></path>
                </svg>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@secure.com"
                  className="
                    bg-transparent w-full border-none p-2 placeholder:text-muted-foreground 
                    focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50
                  "
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
              </div>
            </div>
            {/* password */}
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="flex h-10 items-center rounded-md border border-input bg-transparent pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-inecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 5.5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-.5 0V4a3.5 3.5 0 1 0-7 0v1.5"></path>
                    <path d="M7 10a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1"></path>
                  </g>
                </svg>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="bg-transparent w-full border-none p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  value={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                />
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-x-2 items-center">
                  <Checkbox
                    id="terms"
                    className="border border-white"
                    checked={acceptedTerms}
                    onCheckedChange={(e) => {
                      setAcceptedTerms(!acceptedTerms);
                    }}
                    required
                  />
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                </div>

                <div className="flex flex-col gap-y-8">
                  {/* submit button */}
                  <div className="w-full">
                    <Button
                      type="submit"
                      className="
                        bg-white text-black rounded-lg px-4 py-1 w-full hover:bg-white/75 
                        duration-300 disabled:cursor-not-allowed flex gap-x-2 items-center
                      "
                      disabled={
                        !validEmail(userEmail) ||
                        !isValidPassword(userPassword) ||
                        !acceptedTerms
                      }
                    >
                      {isLoading ? (
                        <ReloadIcon className="w-3 h-3 animate-spin" />
                      ) : (
                        ''
                      )}
                      Sign Up
                    </Button>
                  </div>

                  {/* separator */}
                  <div className="flex flex-col gap-y-3 justify-center">
                    <Separator className="bg-white/30" />

                    <Button
                      variant="link"
                      className="text-white font-thin"
                    >
                      Already have an account?
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
