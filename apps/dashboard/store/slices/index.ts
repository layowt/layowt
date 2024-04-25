import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { DeviceType } from "@/types/DeviceType";
import { RootState } from "../store";

type DeviceTypeState = {
	device: DeviceType
}

// this is the device the user will have upon loading into the app
const initialState: DeviceTypeState = {
	device: 'desktop'
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDeviceType: (state, action: PayloadAction<DeviceType>) => {
			state.device = action.payload
		}	
	}
})

export const {
	setDeviceType
} = deviceSlice.actions

export const device = (state: RootState) => state.device.device;

export default deviceSlice.reducer