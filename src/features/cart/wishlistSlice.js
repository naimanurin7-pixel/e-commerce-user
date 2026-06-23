import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  const data = localStorage.getItem("wishlistItems");
  return data ? JSON.parse(data) : [];
};

const saveWishlist = (items) => {
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(items)
  );
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: loadWishlist(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.find(
        item => item.id === action.payload.id
      );

      if (!exists) {
        state.wishlistItems.push(action.payload);
        saveWishlist(state.wishlistItems);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems =
        state.wishlistItems.filter(
          item => item.id !== action.payload
        );

      saveWishlist(state.wishlistItems);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;