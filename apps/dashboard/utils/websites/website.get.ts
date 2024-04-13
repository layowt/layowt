import { prisma } from '@/utils/prisma';
import type { websites as website } from '@prisma/client';

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
export const getWebsite = async <T extends website | website[] = website>(
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

		let websiteData: website | website[] = [];

		if(!returnMany)
			websiteData = await prisma.websites.findUnique(opts);
		else
			websiteData = await prisma.websites.findMany(opts);

		return websiteData as T;
};
