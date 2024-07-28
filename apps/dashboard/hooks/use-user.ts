import { useEffect, useState } from "react";
import { useAppDispatch } from "@/utils/index";
import { setUser as setStoreUser, user } from "@/store/slices/user-store";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

/**
 * Hook to get the current user, whilst setting the user in the 
 * user store.
 * 
 * @returns User
 */
export const useUser = () => {
	const dispatch = useAppDispatch();
	const supabase = createClient();

	const [user, setUser] = useState<User>(null);

	let init = false;
	useEffect(() => {
		if(init) return;
		init = true;
		const getUser = async () => {
			const { data: user } = await supabase.auth.getUser();
			setUser(user.user);

			dispatch(setStoreUser(user.user));
		}
		getUser();
	}, [])

	return user;
}