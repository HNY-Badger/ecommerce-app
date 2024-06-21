import api from '.';
import { Customer } from '../types/customer';
import {
  AddressActions,
  PersonalActions,
  UpdateAddressParams,
  UpdatePasswordParams,
  UpdatePersonalParams,
} from '../types/updateCustomer';

class UpdateAPI {
  public static async updatePersonal<T extends PersonalActions>(params: UpdatePersonalParams<T>): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/${params.id}`, params.data);
    return resp.data;
  }

  public static async updateAddress<T extends AddressActions>(params: UpdateAddressParams<T>): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/${params.id}`, params.data);
    return resp.data;
  }

  public static async updatePassword(data: UpdatePasswordParams): Promise<Customer> {
    const resp = await api.post<Customer>(`/${process.env.CTP_PROJECT_KEY}/customers/password`, data);
    return resp.data;
  }
}

export default UpdateAPI;
