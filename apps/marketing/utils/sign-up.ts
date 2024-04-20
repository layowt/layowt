'use server'
import { prisma } from "@/utils/prisma";

export const signUp = async (email: string) => {
	await prisma.earlyAccess.create({
		data: {
			email,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	})
}