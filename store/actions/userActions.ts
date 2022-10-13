import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  usersList: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => ({ ...state, user: action.payload }),
    usersList: (state, action) => ({ ...state, usersList: action.payload }),
    logoutUser: (state) => ({ ...state, user: {} }),
  },
});

export const { loginUser, logoutUser, usersList } = userSlice.actions;
export default userSlice.reducer;
