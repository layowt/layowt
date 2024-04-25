// redux imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSliceReducer from '@/store/slices/user-store';
import deviceTypeReducer from '@/store/slices/index'

// exported function to crate the stores
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    device: deviceTypeReducer
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
