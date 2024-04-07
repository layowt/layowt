import { createClient } from "@/utils/supabase/server";

export default function getUserFromSession() {
	const supabase = createClient();

	return supabase.auth.getUser();
}