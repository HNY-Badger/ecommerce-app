import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { APIErrorResponse } from '../../types/api';
import { CartResponse } from '../../types/cart';
import CartAPI from '../../api/cart';
import { CartActions, CartThunkPayload, UpdateCartParams } from '../../types/updateCart';

const refreshCart = createAsyncThunk<CartResponse, void, { rejectValue: string }>('cart/refreshCart', async () => {
  try {
    await CartAPI.checkIfActiveCartExists();
    const cart = await CartAPI.getActiveCart();
    return cart;
  } catch {
    const cart = await CartAPI.createCart();
    return cart;
  }
});

const updateCartThunk = <T extends CartActions>(action: T) =>
  createAsyncThunk<CartResponse, CartThunkPayload<T>, { rejectValue: string }>(
    `cart/${action}`,
    async ({ id, version, actionBody }) => {
      const cart = await CartAPI.updateCart({
        id,
        data: {
          version,
          actions: [{ action, ...actionBody }],
        },
      });
      return cart;
    }
  );

const updateCart = {
  addLineItem: updateCartThunk('addLineItem'),
  removeLineItem: updateCartThunk('removeLineItem'),
  addDiscountCode: updateCartThunk('addDiscountCode'),
  removeDiscountCode: updateCartThunk('removeDiscountCode'),
  changeLineItemQuantity: updateCartThunk('changeLineItemQuantity'),
};

export { refreshCart, updateCart };
