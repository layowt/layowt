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
import userSliceReducer from './store/user-store';

const store = configureStore({
  reducer: {
    user: userSliceReducer
  }
});

export default store;
