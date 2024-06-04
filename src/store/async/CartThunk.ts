import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../../types/api';
import { CartResponse } from '../../types/cart';
import CartAPI from '../../api/cart';
import { CartActions, UpdateCartParams } from '../../types/updateCart';

const refreshCart = createAsyncThunk<CartResponse | undefined, void, { rejectValue: string | undefined }>(
  'cart/refreshCart',
  async (_, thunkAPI) => {
    try {
      await CartAPI.checkIfActiveCartExists();
      const cart = await CartAPI.getActiveCart();
      return cart;
    } catch {
      try {
        const cart = await CartAPI.createCart();
        return cart;
      } catch (e) {
        const err = e as AxiosError<APIErrorResponse>;
        thunkAPI.rejectWithValue(err.response?.data.message);
        return undefined;
      }
    }
  }
);

const updateCart = createAsyncThunk<
  CartResponse | undefined,
  UpdateCartParams<CartActions>,
  { rejectValue: string | undefined }
>('cart/updateCart', async (params, thunkAPI) => {
  try {
    const cart = await CartAPI.updateCart(params);
    return cart;
  } catch (e) {
    const err = e as AxiosError<APIErrorResponse>;
    thunkAPI.rejectWithValue(err.response?.data.message);
    return undefined;
  }
});

export { refreshCart, updateCart };
