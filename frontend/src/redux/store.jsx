import { configureStore } from "@reduxjs/toolkit";
import {
  registerUserSlice,
  loginSlice,
  updateSlice,
  getAllUsersSlice,
  deleteUserSlice,
} from "./user.slice";
import productSlice from "./product.slice";
import orderSlice from "./order.slice";
import cartSlice from "./cart.slice";

// Middleware to save cart items to localStorage
const saveCartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type.startsWith("cart/") &&
    ["addItemToCart", "updateCartQuantity", "removeFromCart"].includes(
      action.type.split("/")[1]
    )
  ) {
    const cartItems = store.getState().cartReducer.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  return result;
};

const store = configureStore({
  reducer: {
    registerReducer: registerUserSlice.reducer,
    loginReducer: loginSlice.reducer,
    updateUserReducer: updateSlice.reducer,
    getAllUsersReducer: getAllUsersSlice.reducer,
    deleteUserReducer: deleteUserSlice.reducer,
    productReducer: productSlice,
    orderReducer: orderSlice,
    cartReducer: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartMiddleware),
});

export default store;
