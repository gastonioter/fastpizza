import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    pizzas: [],
  },
  reducers: {
    add(state, action) {
      // payload = newItem
      state.pizzas.push(action.payload);
    },
    remove(state, action) {
      // payload = id
      state.pizzas = state.pizzas.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    incQty(state, action) {
      const item = state.pizzas.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decQty(state, action) {
      const item = state.pizzas.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.remove(state, action);
    },
    clear(state) {
      state.pizzas = [];
    },
  },
});

export const { add, remove, incQty, decQty, clear } = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQty = (state) =>
  state.cart.pizzas.reduce((ac, item) => ac + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.pizzas.reduce((ac, item) => ac + item.totalPrice, 0);

export const getQuantityById = (id) => (state) =>
  state.cart.pizzas.find((p) => p.pizzaId === id)?.quantity ?? 0;
