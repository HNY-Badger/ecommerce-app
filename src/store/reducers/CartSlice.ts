import { ActionReducerMapBuilder, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartResponse } from '../../types/cart';
import { clearCart, refreshCart, updateCart } from '../async/CartThunk';

type CartState = { data: CartResponse | null; loading: boolean; error: string };

const initialState: CartState = {
  data: null,
  loading: false,
  error: '',
};

const handleAsyncCases = <ThunkArg>(
  builder: ActionReducerMapBuilder<CartState>,
  asyncThunk: AsyncThunk<CartResponse | undefined, ThunkArg, { rejectValue: string | undefined }>
) => {
  builder
    .addCase(asyncThunk.fulfilled, (_, action) => ({
      data: action.payload ?? null,
      loading: false,
      error: '',
    }))
    .addCase(asyncThunk.pending, (state) => ({ ...state, error: '', loading: true }))
    .addCase(asyncThunk.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ?? 'Unexpected error occurred',
    }));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartStore: () => initialState,
  },
  extraReducers(builder) {
    handleAsyncCases(builder, refreshCart);
    handleAsyncCases(builder, updateCart.addLineItem);
    handleAsyncCases(builder, updateCart.removeLineItem);
    handleAsyncCases(builder, updateCart.addDiscountCode);
    handleAsyncCases(builder, updateCart.removeDiscountCode);
    handleAsyncCases(builder, updateCart.changeLineItemQuantity);
    handleAsyncCases(builder, clearCart);
  },
});

export const { resetCartStore } = cartSlice.actions;

export default cartSlice.reducer;
