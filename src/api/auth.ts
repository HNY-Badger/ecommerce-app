import axios, { AxiosError } from 'axios';
import { CustomerRegistrationData, CustomerResponse } from '../types/customer';
import Cookie from '../store/cookie';
import TokenAPI from './token';
import { APIErrorResponse } from '../types/api';

export default class AuthAPI {
  private static authAPI = axios.create({
    baseURL: `${process.env.CTP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  public static async register(customer: CustomerRegistrationData): Promise<void> {
    try {
      const data = { ...customer };
      let token = Cookie.getCookie('accessToken');
      if (!token) {
        token = await TokenAPI.updateToken()
          .then((resp) => resp?.access_token)
          .catch((err: APIErrorResponse) => {
            throw Error(err.message);
          });
      }
      if (!data.defaultBillingAddress) {
        delete data.defaultBillingAddress;
      }
      if (!data.defaultShippingAddress) {
        delete data.defaultShippingAddress;
      }
      return this.authAPI
        .post(`/${process.env.CTP_PROJECT_KEY}/customers`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {})
        .catch((err: AxiosError<APIErrorResponse>) => Promise.reject(err.response?.data));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public static async login(email: string, password: string): Promise<CustomerResponse> {
    try {
      const token = await TokenAPI.getCustomerToken(email, password)
        .then((resp) => resp?.access_token)
        .catch((err: APIErrorResponse) => {
          throw Error(err.message);
        });
      return this.authAPI
        .post<CustomerResponse>(
          `/${process.env.CTP_PROJECT_KEY}/login`,
          { email, password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          const expire = new Date(new Date().getTime() + 2592000000); // 30 days
          Cookie.setCookie('customerID', resp.data.customer.id, expire);
          return resp.data;
        })
        .catch((err: AxiosError<APIErrorResponse>) => Promise.reject(err.response?.data));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
