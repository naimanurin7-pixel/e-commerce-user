import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalPrice: 0 };
  } catch (error) {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
};

const calculateTotals = (state) => {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
