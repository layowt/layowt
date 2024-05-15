'use server'

import { prisma } from '@/utils/prisma';
import type { users as user } from '@prisma/client';

import { createClient } from "../supabase/client";
import { createClient as CreateServerClient } from "@/utils/supabase/server";
import { UserResponse } from '@supabase/supabase-js';

/**
 * 
 * Get a user from the database via a given id
 * 
 * @param id 
 * @returns 
 */
export const getUserFromDb = async (id: string): Promise<user> => {
	if(!id) throw new Error('No id provided')

	const user = await prisma.users.findFirst({
		where: {
			uid: {
				equals: id
			}
		}
	});

	if(user) return user

	if(!user) console.error('No user found with that id')
}

/**
 * Returns the user from the client
 * 
 * @returns UserResponse
 */
export const getClientUser = (): Promise<UserResponse> => {
	const supabase = createClient();

	return supabase.auth.getUser()
}

/**
 * Logs the user into the application
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export const login = async (email: string, password: string) => {
	const supabase = createClient();

	if(!supabase) throw new Error('No supabase client found')

	if(!email || !password) throw new Error('Email and password are required')

	try {
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) throw new Error(error.message);

		// update the 'lastLoggedIn' field in the db
		await prisma.users.update({
			where: {
				uid: user?.user.id
			},
			data: {
				lastLogin: new Date()
			}
		});
		
		return user;
	} catch (error) {
		console.error('Error logging in:', error);
		return null;
	}
}

/**
 * Send a password reset email to the user
 * 
 * @param email 
 * @returns 
 */
export const passwordReset = async (email: string) => {
	const supabase = createClient();

	if(!supabase) throw new Error('No supabase client found')

	if(!email) throw new Error('Email is required')

	try {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: '/forgot-password'
		});
		if (error) throw new Error(error.message);

		return data;
	} catch (error) {
		console.error('Error resetting password:', error);
		return null;
	}
}

/**
 * Get the user from the server - used in api routes, server componets & server actions
 * 
 * @returns 
 */
export const getUserFromSession = () => {
	const supabase = CreateServerClient();

	return supabase?.auth?.getUser();
}
