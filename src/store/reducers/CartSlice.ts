import { createSlice } from '@reduxjs/toolkit';
import { CartResponse } from '../../types/cart';
import { refreshCart, updateCart } from '../async/CartThunk';

type CartState = { data: CartResponse | null; loading: boolean; error: string };

const initialState: CartState = {
  data: null,
  loading: true,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(refreshCart.fulfilled, (_, action) => ({
        data: action.payload ?? null,
        loading: false,
        error: '',
      }))
      .addCase(refreshCart.pending, (state) => ({ ...state, loading: true }))
      .addCase(refreshCart.rejected, (_, action) => ({
        data: null,
        loading: false,
        error: action.payload ?? 'Unexpected error occured',
      }))
      .addCase(updateCart.fulfilled, (_, action) => ({
        data: action.payload ?? null,
        loading: false,
        error: '',
      }))
      .addCase(updateCart.pending, (state) => ({ ...state, loading: true }))
      .addCase(updateCart.rejected, (_, action) => ({
        data: null,
        loading: false,
        error: action.payload ?? 'Unexpected error occured',
      }));
  },
});

export default cartSlice.reducer;
