import { prisma } from '@/utils/prisma';

export const createWebsite = async (userId: string, websiteId: string) => {
	await prisma.websites.create({
		data: {
			websiteId: websiteId,
			owner: {
				connect: {
					uid: userId,
				},
			},
		},
	});
}