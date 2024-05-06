import { prisma } from '@/utils/prisma';

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