import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add_to_cart: (state, action) => {
            const isProductExisit = state.cart.find(product => product._id === action.payload._id)
            if (!isProductExisit) {
                const product = { ...action.payload, quantity: 1 }
                state.cart.push(product)
            }
            else {
                isProductExisit.quantity += 1
            }
        },
        remove_from_cart: (state, action) => {
            if (action.payload.quantity > 1) {
                const product = {
                    ...action.payload,
                    quantity: action.payload.quantity - 1
                }
                state.cart = state.cart.filter(product => product._id !== action.payload._id)
                state.cart.push(product)
            }
            else {
                state.cart = state.cart.filter(product => product._id !== action.payload._id)
            }
        }
    }
})

export const { add_to_cart, remove_from_cart } = cartSlice.actions
export default cartSlice.reducer;