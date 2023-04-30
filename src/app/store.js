import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
/* import logger from "redux-logger"; */
import { productAPI } from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        [productAPI.reducerPath]: productAPI.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productAPI.middleware)
})

export default store