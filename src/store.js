import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/UserSlice';
const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
export default store;
