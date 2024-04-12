import { prisma } from '@/utils/prisma';

export const getUserWebsite = async(userId: string) => {
	if(!userId) throw new Error('No userId provided')

	return await prisma.websites.findMany({
		where: {
			userId: userId
		}
	})
}