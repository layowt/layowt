'use server'
import { prisma } from '@/utils/prisma';

export const getUserSubscription = async(userId: string) => {
	if(!userId) throw new Error('No userId provided')

	return await prisma.subscription.findUnique({
		where: {
			userId: userId
		}
	})
}