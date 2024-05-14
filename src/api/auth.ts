import axios from 'axios';
import { CustomerRegistrationData, CustomerResponse } from '../types/customer';
import Cookie from '../store/cookie';
import TokenAPI from './token';
import LocalStorage from '../store/localStorage';

class AuthAPI {
  private static authAPI = axios.create({
    baseURL: `${process.env.CTP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  public static async register(data: CustomerRegistrationData): Promise<CustomerResponse> {
    let token = Cookie.getCookie('accessToken');
    if (!token) {
      const resp = await TokenAPI.updateToken();
      token = resp?.access_token;
    }
    const resp = await this.authAPI.post<CustomerResponse>(`/${process.env.CTP_PROJECT_KEY}/customers`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  }

  public static async login(email: string, password: string): Promise<CustomerResponse> {
    const tokenResp = await TokenAPI.getCustomerToken(email, password);
    const token = tokenResp?.access_token;
    const resp = await this.authAPI.post<CustomerResponse>(
      `/${process.env.CTP_PROJECT_KEY}/login`,
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp.data;
  }
}

export default AuthAPI;
