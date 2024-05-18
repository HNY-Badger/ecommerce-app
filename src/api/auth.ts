import axios from 'axios';
import { CustomerRegistrationData, CustomerResponse } from '../types/customer';
import Cookie from '../store/cookie';
import TokenAPI from './token';

const api = axios.create({
  baseURL: `${process.env.CTP_API_URL}`,
});
api.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  let token = Cookie.getCookie('accessToken');
  if (!token) {
    const resp = await TokenAPI.updateToken();
    token = resp.access_token;
  }
  newConfig.headers.Authorization = `Bearer ${token}`;
  newConfig.headers['Content-Type'] = 'application/json';
  return newConfig;
});

class AuthAPI {
  private static authAPI = api;

  public static async register(data: CustomerRegistrationData): Promise<CustomerResponse> {
    const resp = await this.authAPI.post<CustomerResponse>(`/${process.env.CTP_PROJECT_KEY}/customers`, data);
    return resp.data;
  }

  public static async login(email: string, password: string): Promise<CustomerResponse> {
    await TokenAPI.getCustomerToken(email, password);
    const data = { email, password };
    const resp = await this.authAPI.post<CustomerResponse>(`/${process.env.CTP_PROJECT_KEY}/login`, data);
    return resp.data;
  }
}

export default AuthAPI;
