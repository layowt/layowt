import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import type { websites as Website } from "@prisma/client";

type WebsiteTypeState = {
	website: Website | null
}

const initialState: WebsiteTypeState = {
	website: null
}

const websiteSlice = createSlice({
	name: 'website',
	initialState,
	reducers: {
		setWebsite: (state, action: PayloadAction<Website>) => {
			state.website = action.payload
		}
	}
})

export const {
	setWebsite
} = websiteSlice.actions

export const website = (state: RootState) => state.website.website
export default websiteSlice.reducer