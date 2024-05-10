'use server'

/**
 * This file contains all of the server actions related 
 * to websites that need to mutate data on the server.
*/

import { supabase } from '@/lib/supabase';
import { prisma } from '@/utils/prisma';
import type { websites as Website } from '@prisma/client'
import { revalidatePath, revalidateTag } from 'next/cache';

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

	revalidateTag('websites');

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

	revalidatePath('/dashboard');

	// return a boolean value of the response so we can
	// check for a value when calling this function
	return 'ok';
}