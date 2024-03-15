'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserFromDb = async (id: string): Promise<any> => {
	if(!id) {	
		//throw new Error('No id provided')
	}

	const user = await prisma.users.findFirst({
		where: {
			uid: id
		}
	});

	if(user) return user
}