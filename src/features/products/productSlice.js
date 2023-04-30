import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct, deleteProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    isErorr: false,
    error: ""
}

export const getProducts = createAsyncThunk("products/getProducts", async () => {
    const products = await fetchProducts()
    return products
})
export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const product = await postProduct(data)
    return product
})
export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkAPI) => {
    const result = await deleteProduct(id)
    thunkAPI.dispatch(removeFromList(id))
    return result
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state, action) => {
            state.postSuccess = false
        },
        toggleDeleteSuccess: (state, action) => {
            state.deleteSuccess = false
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true
            state.isErorr = false
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.isErorr = false
            state.isLoading = false
        }).addCase(getProducts.rejected, (state, action) => {
            state.products = []
            state.isLoading = false
            state.isErorr = true
            state.error = action.error.message;
        }).addCase(addProduct.pending, (state, action) => {
            state.isLoading = true
            state.isErorr = false
            state.postSuccess = false
        }).addCase(addProduct.fulfilled, (state, action) => {
            state.postSuccess = true
            state.isErorr = false
            state.isLoading = false
        }).addCase(addProduct.rejected, (state, action) => {
            state.products = []
            state.isLoading = false
            state.isErorr = true
            state.postSuccess = false
            state.error = action.error.message;
        }).addCase(removeProduct.pending, (state, action) => {
            state.isLoading = true
            state.deleteSuccess = false
            state.isErorr = false
        }).addCase(removeProduct.fulfilled, (state, action) => {
            state.deleteSuccess = true
            state.isLoading = false
        }).addCase(removeProduct.rejected, (state, action) => {
            state.products = []
            state.deleteSuccess = false
            state.isLoading = false
            state.isErorr = true
            state.error = action.error.message;
        });
    }
})

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } = productSlice.actions
export default productSlice.reducer