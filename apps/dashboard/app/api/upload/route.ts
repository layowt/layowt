import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const formData = await req.formData();

	// Remember to enforce type here and after use some lib like zod.js to check it
	const files = formData.get('files') as File;
	const userId = formData.get('userId') as string;
	const websiteId = formData.get('siteId') as string;

	// Upload the files to the storage
	// The file will be stored in the user-sites bucket with the key `websiteId/logo`
	const { data: upload, error } = await supabase.storage
		.from('user-sites')
		.upload(
			`${websiteId}/logo.png`,
			files[0],
			{ 
				cacheControl: '3600',
				upsert: false
			},
		);

	// Update the database with the new logo
	if(error && error instanceof Error) {
		return NextResponse.json({ message: error.message });
	}

	return NextResponse.json(
		{ 
			message: 'Files Created',
			logoUrl: upload.path
		}
	);
}