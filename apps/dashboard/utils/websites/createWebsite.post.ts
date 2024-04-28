import { prisma } from '@/utils/prisma';

export const createWebsite = async (userId: string, websiteId: string) => {
	const response = await prisma.websites.create({
		data: {
			websiteId: websiteId,
			websiteName: '', // Add the required 'websiteName' property with a default value
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