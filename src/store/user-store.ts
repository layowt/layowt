import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
// type imports
import type { User } from '@supabase/supabase-js';

type UserInitialState = {
  user: Partial<User> | null;
  count: number;
};

const initialState: UserInitialState = {
  user: null,
  count: 0
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
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, actions: PayloadAction<number>) => {
      state.count += actions.payload;
    }
  }
});

// export the actions
export const {
  getUser,
  createUser,
  increment,
  decrement,
  incrementByAmount,
  deleteUser
} = userSlice.actions;

export const count = (state: RootState) => state.user.count;

export const user = (state: RootState) => state.user.user;
// export the functions from the reducer
export default userSlice.reducer;
