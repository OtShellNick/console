import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
};

const permissionsSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    getRoles: (state, action) => ({ ...state, roles: action.payload }),
  },
});

export const { getRoles } = permissionsSlice.actions;
export default permissionsSlice.reducer;
