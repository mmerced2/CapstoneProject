import { configureStore } from "@reduxjs/toolkit";
import { products_api } from "./api";


export default configureStore({
    reducer: {
        [products_api.reducerPath]: products_api.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(products_api.middleware),
});