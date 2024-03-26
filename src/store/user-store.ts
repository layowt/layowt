import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
// type imports
import type { User } from '@supabase/supabase-js';

type UserInitialState = {
  user: Partial<User> | null;
  billingPeriod: 'month' | 'year';
};

const initialState: UserInitialState = {
  user: null,
  billingPeriod: 'month'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      // get the user from the supabase db via its uid
      console.log(state.user);
    },
    createUser: (state, action: PayloadAction<User>) => {
      // Only set the user if it's currently null
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
    setBillingPeriod: (state, action: PayloadAction<'month' | 'year'>) => {
      state.billingPeriod = action.payload
    }
  }
});

// export the actions
export const {
  getUser,
  createUser,
  deleteUser,
  setBillingPeriod
} = userSlice.actions;

export const user = (state: RootState) => state.user.user;

export const billingPeriod = (state: RootState) => state.user.billingPeriod;
// export the functions from the reducer
export default userSlice.reducer;
