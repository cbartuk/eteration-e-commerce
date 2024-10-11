import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer, // Ürün reducer'ı eklendi
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
