import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@store/actions/userActions';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
