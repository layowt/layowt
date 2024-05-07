'use server'
import { prisma } from '@/utils/prisma';
import type { websites as Website } from '@prisma/client'

/**
 * 
 * Function to delete a website via its id
 * 
 * @param websiteId 
 * @returns 'ok'
 */
export const deleteWebsite = async(websiteId: string) => {
	await prisma.websites.delete({
		where: {
			websiteId
		}
	})

	return 'ok'
}

/**
 * Function to update a website via its id
 * 
 * @param options An object containing:
 * 					- websiteId 
 * 					- options to update
 * @returns void
 */
export const updateWebsite = async (
	websiteId: string,
	options: Partial<Website>
): Promise<Website> => {
	if(!websiteId) throw new Error('No website ID specified')

	// find the site that needs to be update and update it
	const siteToUpdate = await prisma.websites.update({
		where: {
			websiteId
		},
		data: {
			...options,
			lastUpdated: new Date()
		}
	})
	return siteToUpdate;
}

interface WebsiteOptions {
	userId?: string;
	websiteId?: string;
}

/**
 * Function to retrieve a website from the database 
 * via passing in data
 * 
 * @param options An object containing properties:
 *                - userId: The ID of the user.
 *                - websiteId: The ID of the website.
 * @returns A Promise resolving to an array of websites.
 */
export const getWebsite = async <T extends Website | Website[] = Website>(
	options: WebsiteOptions,
	returnMany: boolean = false
): Promise<T> => {
    const { userId, websiteId } = options;

		// create a new object to pass to the prisma query
		const opts = {
			where: {
				...(userId && { userId }), // Only include userId in where clause if it's provided
				...(websiteId && { websiteId }) // Only include websiteId in where clause if it's provided
			}
		};

		let websiteData: Website | Website[] = [];

		if(!returnMany)
			websiteData = await prisma.websites.findUnique(opts);
		else
			websiteData = await prisma.websites.findMany(opts);

		return websiteData as T;
};

export const createWebsite = async (userId: string, websiteId: string) => {
	const response = await prisma.websites.create({
		data: {
			websiteLogo: '',
			websitePrimaryColor: '#ffffff',
			websiteSecondaryColor: '#000000',
			websiteUrl: '',
			websiteId: websiteId,
			//TODO: GENERATE NAME FOR HERE
			websiteName: 'Untitled', 
			owner: {
				connect: {
					uid: userId,
				},
			},
		},
	});

	if(!response) throw new Error('Failed to create website');

	// return a boolean value of the response so we can
	// check for a value when calling this function
	return !!response;
}