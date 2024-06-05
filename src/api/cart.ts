import api from '.';
import { CartResponse } from '../types/cart';
import { CartActions, UpdateCartParams } from '../types/updateCart';

class CartAPI {
  // Responses are codes 404 and 200, on 404 it emits an error, so dont forget to catch it
  public static async checkIfActiveCartExists(): Promise<void> {
    return api.head(`/${process.env.CTP_PROJECT_KEY}/me/active-cart`);
  }

  public static async getActiveCart(): Promise<CartResponse> {
    const resp = await api.get<CartResponse>(`/${process.env.CTP_PROJECT_KEY}/me/active-cart`);
    return resp.data;
  }

  public static async createCart(): Promise<CartResponse> {
    const data = {
      currency: 'USD',
    };
    const resp = await api.post<CartResponse>(`/${process.env.CTP_PROJECT_KEY}/me/carts`, data);
    return resp.data;
  }

  public static async updateCart<T extends CartActions>({ id, data }: UpdateCartParams<T>): Promise<CartResponse> {
    const resp = await api.post<CartResponse>(`/${process.env.CTP_PROJECT_KEY}/me/carts/${id}`, data);
    return resp.data;
  }

  public static async deleteCart(id: string, version: number): Promise<CartResponse> {
    const resp = await api.delete<CartResponse>(`/${process.env.CTP_PROJECT_KEY}/me/carts/${id}?version=${version}`);
    return resp.data;
  }
}

export default CartAPI;
