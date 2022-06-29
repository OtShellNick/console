import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/actions/userActions';
import permissionsReducer from '@store/actions/permissionsActions';
import rolesReducer from '@store/actions/rolesActions';

const store = configureStore({
  reducer: {
    user: userReducer,
    permissions: permissionsReducer,
    roles: rolesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
