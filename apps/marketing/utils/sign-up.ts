'use server'
import { prisma } from '@layowt/database';

export const signUp = async (email: string): Promise<409 | 'ok'> => {
	// try to find the email in the early access table
	const earlyAccess = await prisma.earlyAccess.findFirst({
		where: {
			email
		}
	})
	
	if(earlyAccess) {
		return 409
	}

	await prisma.earlyAccess.create({
		data: {
			email,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	})

	return 'ok'
}