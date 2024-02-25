// firebase imports
import { auth } from '@/lib/firebase-config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export async function SignUp(email: string, password: string) {
  // create the user with the passed in email and password
  const userCredential = await createUserWithEmailAndPassword(
    auth, //
    email,
    password
  );

  const user = userCredential.user;

  // if we do not have a user, return an empty string
  // TODO: this should be a better error message
  // TODO: This should also add to supabase db
  if (!user) return '';

  // return the user
  return user;
}

export function useUser() {
  const [user, setUser] = useState<User | null | false>(false);

  console.log(user);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}
