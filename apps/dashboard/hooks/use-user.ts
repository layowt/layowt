import { useAppDispatch } from "@/utils/index";
import { setUser as setStoreUser, user } from "@/store/slices/user-store";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { getClientUser } from "@/actions/user/get-user";

/**
 * Hook to get the current user, whilst setting the user in the 
 * user store.
 * 
 * @returns User
 */
export const useUser = () => {
	const dispatch = useAppDispatch();
	const supabase = createClient();

	return useQuery({
		queryKey: ['get-user'],
		queryFn: getClientUser,
	})

	// useEffect(() => {
	// 	if(init) return;
	// 	init = true;
	// 	const getUser = async () => {
	// 		const { data: user } = await supabase.auth.getUser();
	// 		setUser(user.user);

	// 		dispatch(setStoreUser(user.user));
	// 	}
	// 	getUser();
	// }, [])
}