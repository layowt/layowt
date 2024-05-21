// redux imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSliceReducer from '@/store/slices/user-store';
import deviceTypeReducer from '@/store/slices/index'
import websiteSlice from '@/store/slices/website-store'
import canvasSlice from '@/store/slices/canvas'

// exported function to crate the stores
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    device: deviceTypeReducer,
    website: websiteSlice,
    canvas: canvasSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
