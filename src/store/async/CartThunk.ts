import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { CartResponse, ClearCartParams } from '../../types/cart';
import CartAPI from '../../api/cart';
import { CartActions, CartThunkPayload } from '../../types/updateCart';
import { APIErrorResponse } from '../../types/api';

const refreshCart = createAsyncThunk<CartResponse | undefined, void, { rejectValue: string | undefined }>(
  'cart/refreshCart',
  async (_, thunkAPI) =>
    CartAPI.checkIfActiveCartExists()
      .then(() =>
        CartAPI.getActiveCart().catch((e: AxiosError<APIErrorResponse>) =>
          thunkAPI.rejectWithValue(e.response?.data.message)
        )
      )
      .catch(() =>
        CartAPI.createCart().catch((e: AxiosError<APIErrorResponse>) =>
          thunkAPI.rejectWithValue(e.response?.data.message)
        )
      )
);

const clearCart = createAsyncThunk<CartResponse | undefined, ClearCartParams, { rejectValue: string | undefined }>(
  `cart/clearCart`,
  async ({ id, version, items }, thunkAPI) =>
    CartAPI.updateCart({
      id,
      data: {
        version,
        actions: items.map((item) => ({
          action: 'removeLineItem',
          lineItemId: item.lineItemId,
          quantity: item.quantity,
        })),
      },
    }).catch((e: AxiosError<APIErrorResponse>) => thunkAPI.rejectWithValue(e.response?.data.message))
);

const updateCartThunk = <T extends CartActions>(action: T) =>
  createAsyncThunk<CartResponse | undefined, CartThunkPayload<T>, { rejectValue: string | undefined }>(
    `cart/${action}`,
    async ({ id, version, actionBody }, thunkAPI) =>
      CartAPI.updateCart({
        id,
        data: {
          version,
          actions: [{ action, ...actionBody }],
        },
      }).catch((e: AxiosError<APIErrorResponse>) => thunkAPI.rejectWithValue(e.response?.data.message))
  );

const updateCart = {
  addLineItem: updateCartThunk('addLineItem'),
  removeLineItem: updateCartThunk('removeLineItem'),
  addDiscountCode: updateCartThunk('addDiscountCode'),
  removeDiscountCode: updateCartThunk('removeDiscountCode'),
  changeLineItemQuantity: updateCartThunk('changeLineItemQuantity'),
};

export { refreshCart, updateCart, clearCart };
