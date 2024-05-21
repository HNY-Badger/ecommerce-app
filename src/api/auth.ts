import api from '.';
import { CustomerRegistrationData, CustomerResponse } from '../types/customer';
import TokenAPI from './token';

class AuthAPI {
  public static async register(data: CustomerRegistrationData): Promise<CustomerResponse> {
    const resp = await api.post<CustomerResponse>(`/${process.env.CTP_PROJECT_KEY}/customers`, data);
    return resp.data;
  }

  public static async login(email: string, password: string): Promise<CustomerResponse> {
    await TokenAPI.getCustomerToken(email, password);
    const data = { email, password };
    const resp = await api.post<CustomerResponse>(`/${process.env.CTP_PROJECT_KEY}/login`, data);
    return resp.data;
  }
}

export default AuthAPI;
