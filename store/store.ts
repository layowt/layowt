/**
 *
 * This is the store configuration file
 *
 * Register all created stores in this file
 *
 */

// redux imports
import { configureStore } from '@reduxjs/toolkit';

// import the user-store to use in the reducer option
import userSliceReducer from './user-store';

// exported function to crate the stores
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSliceReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
