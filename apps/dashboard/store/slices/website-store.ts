import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import type { Website } from "@prisma/client";

export type SavingState = 'idle' | 'saving' | 'error'
export type SectionState = 'pages' | 'layout' | 'settings' | 'insert'

type WebsiteTypeState = {
	website: Website | null // singular site
	websites: Website[] | null // multiple sites
	saving: SavingState,
	currentSection: SectionState
}

const initialState: WebsiteTypeState = {
	website: null,
	websites: [],
	saving: 'idle',
	currentSection: 'pages'
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
		},
		setCurrentSection: (state, action: PayloadAction<SectionState>) => {
			state.currentSection = action.payload
		}
	}
})

export const {
	setWebsite,
	setSavingState,
	setWebsites,
	removeWebsite,
	setCurrentSection
} = websiteSlice.actions

export const website = (state: RootState) => state.website.website
export const saving = (state: RootState) => state.website.saving
export const currentSection = (state: RootState) => state.website.currentSection

export default websiteSlice.reducer