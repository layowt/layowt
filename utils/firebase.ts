'use client';
// firebase imports
import { auth } from '@/lib/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
