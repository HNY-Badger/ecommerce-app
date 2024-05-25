import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/products';
import fetchProducts from '../async/ProductsThunk';

type ProductsState = { products: Product[]; loading: boolean; error: string };

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newState = { ...state };
        newState.products = action.payload ? action.payload : [];
        newState.loading = false;
        newState.error = '';
        return newState;
      })
      .addCase(fetchProducts.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        return newState;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = action.payload ? action.payload : 'Unexpected error occured';
        return newState;
      });
  },
});

export default productsSlice.reducer;
