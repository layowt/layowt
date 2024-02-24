// redux imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSliceReducer from './user-store';

// configure which keuy we want to persist
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['authState']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, userSliceReducer)
});

// exported function to crate the stores
export const store = configureStore({
  reducer: {
    user: rootReducer
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
