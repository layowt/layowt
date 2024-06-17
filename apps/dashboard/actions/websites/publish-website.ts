'use server'
import { prisma } from '@/utils/prisma';
import type { websites as Website } from '@prisma/client'
import { revalidateTag } from 'next/cache';
import { getEnv } from '@/utils/index';
import { updateWebsite } from '@/actions/websites/update';
import { getWebsite } from '@/actions/websites/get-website';

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