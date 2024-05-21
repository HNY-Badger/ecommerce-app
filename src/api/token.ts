import axios from 'axios';
import Cookie from '../store/cookie';
import { TokenResponse, CustomerTokenResponse } from '../types/token';

class TokenAPI {
  private static tokenAPI = axios.create({
    baseURL: `${process.env.CTP_AUTH_URL}/oauth`,
    headers: {
      Authorization: `Basic ${btoa(`${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  public static async updateToken(): Promise<TokenResponse | CustomerTokenResponse> {
    if (Cookie.getCookie('refreshToken')) {
      try {
        const resp = await this.refreshCustomerToken();
        return resp;
      } catch {
        Cookie.removeCookie('refreshToken');
        return this.getAnonToken();
      }
    }
    return this.getAnonToken();
  }

  public static async getCustomerToken(email: string, password: string): Promise<CustomerTokenResponse> {
    const data = {
      grant_type: 'password',
      scope: `${process.env.CTP_SCOPES}`,
      username: email,
      password,
    };
    const resp = await this.tokenAPI.post<CustomerTokenResponse>(
      `/${process.env.CTP_PROJECT_KEY}/customers/token`,
      data
    );
    const accessLifetime = resp.data.expires_in;
    const refreshLifetime = 2592000000; // 30 days
    Cookie.setCookie('accessToken', resp.data.access_token, accessLifetime);
    Cookie.setCookie('refreshToken', resp.data.refresh_token, refreshLifetime);
    return resp.data;
  }

  private static async refreshCustomerToken(): Promise<TokenResponse> {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: Cookie.getCookie('refreshToken'),
    };
    const resp = await this.tokenAPI.post<TokenResponse>('/token', data);
    if (resp.status === 200) {
      const accessLifetime = resp.data.expires_in;
      Cookie.setCookie('accessToken', resp.data.access_token, accessLifetime);
    }
    return resp.data;
  }

  private static async getAnonToken(): Promise<TokenResponse> {
    const data = {
      grant_type: 'client_credentials',
      scope: `${process.env.CTP_SCOPES}`,
    };
    const resp = await this.tokenAPI.post<TokenResponse>(`/${process.env.CTP_PROJECT_KEY}/anonymous/token`, data);
    if (resp.status === 200) {
      const accessLifetime = resp.data.expires_in;
      Cookie.setCookie('accessToken', resp.data.access_token, accessLifetime);
    }
    return resp.data;
  }
}

export default TokenAPI;
