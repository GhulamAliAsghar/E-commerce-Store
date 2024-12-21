import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/add-cart/addCartSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})