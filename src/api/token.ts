import axios, { AxiosError } from 'axios';
import Cookie from '../store/cookie';
import { TokenResponse, CustomerTokenResponse } from '../types/token';
import { APIErrorResponse } from '../types/api';

class TokenAPI {
  private static tokenAPI = axios.create({
    baseURL: `${process.env.CTP_AUTH_URL}/oauth`,
    headers: {
      Authorization: `Basic ${btoa(`${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  public static async updateToken(): Promise<TokenResponse | CustomerTokenResponse | undefined> {
    if (Cookie.getCookie('refreshToken')) {
      return this.refreshCustomerToken().catch(() => {
        Cookie.removeCookie('refreshToken');
        return this.getAnonToken();
      });
    }
    return this.getAnonToken();
  }

  public static async getCustomerToken(email: string, password: string): Promise<CustomerTokenResponse | undefined> {
    const data = {
      grant_type: 'password',
      scope: `${process.env.CTP_SCOPES}`,
      username: email,
      password,
    };
    return this.tokenAPI
      .post<CustomerTokenResponse>(`/${process.env.CTP_PROJECT_KEY}/customers/token`, data)
      .then((resp) => {
        const accessExpire = new Date(new Date().getTime() + resp.data.expires_in);
        const refreshLifeTime = 2592000000; // 30 days
        const refreshExpire = new Date(new Date().getTime() + refreshLifeTime);
        Cookie.setCookie('accessToken', resp.data.access_token, accessExpire);
        Cookie.setCookie('refreshToken', resp.data.refresh_token, refreshExpire);
        return resp.data;
      })
      .catch((err: AxiosError<APIErrorResponse>) => Promise.reject(err.response?.data));
  }

  private static async refreshCustomerToken(): Promise<TokenResponse | undefined> {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: Cookie.getCookie('refreshToken'),
    };
    return this.tokenAPI
      .post<TokenResponse>('/token', data)
      .then((resp) => {
        if (resp.status === 200) {
          const expire = new Date(new Date().getTime() + resp.data.expires_in);
          Cookie.setCookie('accessToken', resp.data.access_token, expire);
        }
        return resp.data;
      })
      .catch((err: AxiosError<APIErrorResponse>) => Promise.reject(err.response?.data));
  }

  private static async getAnonToken(): Promise<TokenResponse | undefined> {
    const data = {
      grant_type: 'client_credentials',
      scope: `${process.env.CTP_SCOPES}`,
    };
    return this.tokenAPI
      .post<TokenResponse>(`/${process.env.CTP_PROJECT_KEY}/anonymous/token`, data)
      .then((resp) => {
        const expire = new Date(new Date().getTime() + resp.data.expires_in);
        Cookie.setCookie('accessToken', resp.data.access_token, expire);
        return resp.data;
      })
      .catch((err: AxiosError<APIErrorResponse>) => Promise.reject(err.response?.data));
  }
}

export default TokenAPI;
