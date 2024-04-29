import { createClient } from "../supabase/client";

export default function getClientUser(){
	const supabase = createClient();

	return supabase.auth.getUser()
}