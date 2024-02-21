'use client';
// firebase imports
import { auth } from '@/lib/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// redux imports
import { createUser } from '@/store/user-store';
import { useSelector, useDispatch } from 'react-redux';

export function SignUp(email: string, password: string) {
  const dispatch = useDispatch();

  // create the user with the passed in email and password
  const user = createUserWithEmailAndPassword(
    auth, //
    email,
    password
  );

  // if we do not have a user, return an empty string
  // TODO: this should be a better error message
  // TODO: This should also add to supabase db
  if (!user) return '';

  // TODO: Add to user store
  // add the user to the global store

  // return the user
  return user;
}
