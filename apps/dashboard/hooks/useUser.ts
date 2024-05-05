'use client'
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser, user } from "@/store/slices/user-store";
import { createClient } from "@/utils/supabase/client";

export const useUser = () => {
	const dispatch = useAppDispatch();
	const supabase = createClient();

	let init = false;
	useEffect(() => {
		if(init) return;
		init = true;
		const getUser = async () => {
			const { data: user } = await supabase.auth.getUser();

			dispatch(setUser(user.user));
		}
		getUser();
	}, [])

	return user;
}