import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

type UserInitialState = {
  user: User | null;
  count: number;
};

// type imports
import type { User } from '@/types/User';
import { Root } from 'postcss';

const initialState: UserInitialState = {
  user: null,
  count: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User>) => {
      // Merge the payload with the existing user if it's not null
      if (state.user !== null) {
        state.user = { ...state.user, ...action.payload };
      } else {
        state.user = action.payload;
      }
    },
    createUser: (state, action: PayloadAction<User>) => {
      // Only set the user if it's currently null
      if (state.user === null) {
        state.user = action.payload;
      }
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
});

// export the actions
export const { getUser, createUser, increment, decrement } = userSlice.actions;

export const count = (state: RootState) => state.user.count;

// export the functions from the reducer
export default userSlice.reducer;
