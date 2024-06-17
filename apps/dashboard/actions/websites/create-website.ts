'use server'
import { prisma } from '@/utils/prisma';
import { revalidatePath } from 'next/cache';

/**
 * Create a new website
 * 
 * @param userId 
 * @param websiteId 
 * @returns 
 */
export const createWebsite = async (userId: string, websiteId: string) => {

	if(!userId) throw new Error('No user ID specified');

	const response = await prisma.websites.create({
		data: {
			websiteLogo: '',
			websitePrimaryColor: '#ffffff',
			websiteSecondaryColor: '#000000',
			websiteUrl: '',
			websiteId: websiteId,
			websiteName: 'Untitled', 
			createdAt: new Date(),
			lastUpdated: new Date(),
			hasBeenPublished: false,
			owner: {
				connect: {
					uid: userId,
				},
			},
		},
	});

	if(!response) throw new Error('Failed to create website');

	revalidatePath('/dashboard');

	// return a boolean value of the response so we can
	// check for a value when calling this function
	return 'ok';
}