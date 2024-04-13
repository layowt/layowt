import { createClient } from "@/utils/supabase/server";

export function getUserFromSession() {
	const supabase = createClient();

	return supabase.auth.getUser();
}