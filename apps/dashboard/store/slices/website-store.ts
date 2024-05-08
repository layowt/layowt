import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import type { websites as Website } from "@prisma/client";

export type SavingState = 'idle' | 'saving' | 'error'

type WebsiteTypeState = {
	website: Website | null // singular site
	websites: Website[] | null // multiple sites
	saving: SavingState
}

const initialState: WebsiteTypeState = {
	website: null,
	websites: [],
	saving: 'idle',
}

const websiteSlice = createSlice({
	name: 'website',
	initialState,
	reducers: {
		setWebsite: (state, action: PayloadAction<Website | null>) => {
			if(action.payload === null) state.website = null
			state.website = action.payload
		},
		setSavingState: (state, action: PayloadAction<SavingState>) => {
			state.saving = action.payload
		},
		setWebsites: (state, action: PayloadAction<Website[]>) => {
			state.websites = action.payload
		},
		removeWebsite: (state, action: PayloadAction<Website>) => {
			state.websites = state.websites?.filter(website => website.websiteId !== action.payload.websiteId)
		}
	}
})

export const {
	setWebsite,
	setSavingState,
	setWebsites,
	removeWebsite
} = websiteSlice.actions

export const website = (state: RootState) => state.website.website
export const saving = (state: RootState) => state.website.saving
export default websiteSlice.reducer