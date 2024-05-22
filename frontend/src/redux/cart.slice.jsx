import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItems,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const { name, id, price, countInStock } = product;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          name,
          id,
          price,
          countInStock,
          quantity,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },

    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Save to localStorage
    },
  },
});

export const { addItemToCart, updateCartQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
