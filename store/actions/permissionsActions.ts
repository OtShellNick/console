import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: {},
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    getPermissions: (state, action) => ({ ...state, permissions: action.payload }),
  },
});

export const { getPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
