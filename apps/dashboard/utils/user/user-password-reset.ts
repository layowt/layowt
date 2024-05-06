'use server';
import { createClient } from '../supabase/server';

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