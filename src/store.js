import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/UserSlice';
import CartSlice from './features/cart/CartSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: CartSlice,
  },
});
export default store;
