import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/actions/userActions';
import permissionsReducer from '@store/actions/permissionsActions';

const store = configureStore({
  reducer: {
    user: userReducer,
    permissions: permissionsReducer,
  },
});

export default store;
