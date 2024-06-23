'use server'
import { prisma } from '@/utils/prisma';
import type { Website } from '@prisma/client'
import { revalidateTag } from 'next/cache';
import { getUserFromDb } from '../user/get-user';
import { unstable_cache } from 'next/cache';

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
export const getWebsite = unstable_cache(
	async <T extends Website | Website[] = Website>(
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

		return await prisma.website.findUnique(opts) as T;
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
		websiteData = await prisma.website.findUnique(opts);
	else
		websiteData = await prisma.website.findMany(opts);

	revalidateTag('websites');

	return websiteData as T;
});

/**
 * Get a website by its domain
 * 
 * @param websiteDomain - The domain of the website (passed into [domain])
 * @returns 
 */
export const getDynamicSite = async(
	websiteDomain: string
) => {
	return await prisma.website.findFirst({
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
	return await prisma.website.findFirst({
		where: {
			websiteUrl: websiteDomain,
			...opts
		}
	})
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