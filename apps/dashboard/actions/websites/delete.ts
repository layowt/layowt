'use server'
import { prisma } from '@/utils/prisma';
import { supabase } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';

/**
 * 
 * Function to delete a website via its id
 * 
 * @param websiteId 
 * @returns 'ok'
 */
export const deleteWebsite = async(websiteId: string) => {
	// delete the site from the db
	await prisma.website.delete({
		where: {
			websiteId
		}
	})

	// TODO: CHANGE HOW WE UPLOAD USER FILES - MAKE THERE OWN BUCKET PER USER 
	// SO WE CAN EMPTY THE BUCKET, THEN DELETE THE BUCKET WHEN THE
	// USER DELETES THE SITE
	const websiteUploads = await supabase.storage.from('user-sites').list();

	// delete the site's files from the storage
	const websiteFiles = websiteUploads.data.filter((file) => file.name.includes(websiteId));

	websiteFiles.forEach(async (file) => {
		await supabase.storage.from('websites').remove([file.name]);
	});

	// god. send. 🤩.
	revalidateTag('websites');
	// revalidatePath('/dashboard');
	return 'ok'
}