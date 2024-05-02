import { supabase } from "@/lib/supabase"

export default async function uploadImage(userId: string, file: File) {
	const { data, error } = 
		await supabase.storage.from(
		'user-site-logos',
	).upload(userId + file.name, file, {
		contentType: 'image/png',
	})

	if (error) {
		console.error('Error uploading image:', error)
		return
	}

	console.log('Image uploaded:', data)
	return data
}