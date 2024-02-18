import { createSlice } from '@reduxjs/toolkit';

type UserInitialState = {
  user: User | null;
};

// type imports
import type { User } from '@/types/User';

const initialState: UserInitialState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user;
    }
  }
});

// export the actions
export const { setUser } = userSlice.actions;

// export the functions from the reducer
export default userSlice.reducer;
