import api from '.';
import { Customer } from '../types/customer';
import { UpdateAddressParams, UpdatePasswordParams, UpdatePersonalParams } from '../types/update';

class UpdateAPI {
  public static async updatePersonal(params: UpdatePersonalParams): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/${params.id}`, params.data);
    return resp.data;
  }

  public static async updateAddress(params: UpdateAddressParams): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/${params.id}`, params.data);
    return resp.data;
  }

  public static async updatePassword(data: UpdatePasswordParams): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/password`, data);
    return resp.data;
  }
}

export default UpdateAPI;
