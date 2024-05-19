'use server'

/**
 * This file contains all of the server actions related 
 * to websites that need to mutate data on the server.
*/

import { supabase } from '@/lib/supabase';
import { user } from '@/store/slices/user-store';
import { prisma } from '@/utils/prisma';
import type { websites as Website } from '@prisma/client'
import { revalidatePath, revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';
import { getEnv } from '@/utils/index';
import { getUserFromDb } from '../user';

/**
 * 
 * Function to delete a website via its id
 * 
 * @param websiteId 
 * @returns 'ok'
 */
export const deleteWebsite = async(websiteId: string) => {
	// delete the site from the db
	await prisma.websites.delete({
		where: {
			websiteId
		}
	})

	// TODO: CHANGE HOW WE UPLOAD USER FILES - MAKE THERE OWN BUCKET PER USER 
	// SO WE CAN EMPTY THE BUCKET, THEN DELETE THE BUCKET WHEN THE
	// USER DELETES THE SITE
	const websiteUploads = await supabase.storage.from('user-sites').list();

	// delete the site's files from the storage
	const websiteFiles = websiteUploads.data.filter((file) => file.name.includes(websiteId));


	websiteFiles.forEach(async (file) => {
		await supabase.storage.from('websites').remove([file.name]);
	});

	// god. send. 🤩.
	revalidateTag('websites');
	// revalidatePath('/dashboard');
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

	revalidateTag('websites');

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
 * @param userId userId: The ID of the user.
 * @param websiteId websiteId: The ID of the website.
 * @returns A Promise resolving to an array of websites or a singular site.
 */
export const getWebsite = async <T extends Website | Website[] = Website>(
	options: WebsiteOptions,
	returnMany: boolean = false
): Promise<T> => {
	const { userId, websiteId } = options;

	// if we have both userId and websiteId, we want to check the websiteId owner is the userId
	if(userId && websiteId) {
		const opts = {
			where: {
				websiteId,
				AND: {
					owner: { 
						uid: userId
					}
				}
			}
		}

		return await prisma.websites.findUnique(opts) as T;
	}

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

	revalidateTag('websites');

	return websiteData as T;
};

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
			//TODO: GENERATE NAME FOR HERE
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

/**
 * 
 * Publish a website via its id
 * 
 * @param websiteId 
 * @param opts 
 * @returns 
 */
export const publishSite = async(
	websiteId: string,
	opts?: Partial<Website>
) => {
	// get the current environment to determine the website url (localhost or layowt)
	const env = getEnv() === 'production' ? 'app.layowt.com' : 'app.localhost:4343';

	// get the website data
	const websiteData = await getWebsite({ websiteId });

	let websiteName = `${websiteData?.websiteName.toLowerCase().replace(/\s/g, '-')}.app.${env}`;

	// check if the name has been taken already
	const websiteNameExists = await prisma.websites.findFirst({
		where: {
			websiteUrl: websiteName
		},
	});

	// if the site already exists, append the websiteId to the name to the subdomain
	if(websiteNameExists) {
		websiteName = websiteName.split('.')[0] + `-${websiteId}.${env}`;
	}

	await updateWebsite(websiteId, {
		...opts,
		hasBeenPublished: true,
		lastUpdated: new Date(),
		websiteUrl: websiteName
	});

	revalidateTag('websites');

	return 'ok';
}

/**
 * Get a website by its domain
 * 
 * @param websiteDomain - The domain of the website (passed into [domain])
 * @returns 
 */
export const getDynamicSite = async(
	websiteDomain: string
) => {
	return await prisma.websites.findFirst({
		where: {
			websiteUrl: websiteDomain,
		},
	})
}

/**
 * 
 * Get a websites data via its domain
 * 
 * @param websiteDomain 
 * @returns 
 */
export const getWebsiteByDomain = async(
	websiteDomain: string,
	opts = {}
) => {
	return await prisma.websites.findFirst({
		where: {
			websiteUrl: websiteDomain,
			...opts
		}
	})
}

/**
 * 
 * Update the URL of a website
 * Check if the new name is already taken
 * 
 * @param websiteId 
 * @param newName 
 * @param userId 
 * @returns 
 */
export const updateWebsiteUrlChange = async(
	websiteId: string,
	newName: string,
	userId: string
) => {
	// first check if the website name is already taken
	const websiteExists = await getWebsiteByDomain(newName, {
		AND: {
			websiteId: {
				not: websiteId
			}
		}
	});

	// if the website exists, return an error
	if(websiteExists) {
		return {
			statusCode: 409,
			message: 'Website name already exists'
		}
	}

	await updateWebsite(websiteId, {
		websiteUrl: newName,
		lastUpdatedUid: userId
	});

	revalidateTag('websites');

	return {
		statusCode: 200,
		message: 'Website name updated successfully'
	}
}

/**
 * Get's the last user that updated the website
 * 
 * @param websiteId 
 * @returns 
 */
export const getLastUpdatedUser = async (websiteId: string) => {
	const { lastUpdatedUid } = await getWebsite({ websiteId });
	if(!lastUpdatedUid) return null;

	return await getUserFromDb(lastUpdatedUid);
}
