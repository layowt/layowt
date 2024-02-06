import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SignUp } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
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
    setIsLoading(true);

    try {
      // try to get the user
      const user = await SignUp(userEmail, userPassword);

      // For now, redirect the user to the home page
      if (!user) return;

      router.push('/');

      setIsLoading(false);
    } catch (e) {
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
              <Input
                id="email"
                type="email"
                placeholder="hello@secure.com"
                className="bg-transparent flex items-center"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
            </div>
            {/* password */}
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                className="bg-transparent flex items-center"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
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
