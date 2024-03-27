'use server'
import { prisma } from '../prisma';

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