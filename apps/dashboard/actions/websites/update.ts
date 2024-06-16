'use server'
import type { websites as Website } from "@prisma/client"
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';
import { getWebsiteByDomain } from ".";

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