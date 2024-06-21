import api from '.';
import { PromocodeResponse } from '../types/promocode';

class PromocodeAPI {
  public static async getActivePromocodes(): Promise<PromocodeResponse> {
    const params = {
      where: 'isActive=true',
    };
    const resp = await api.get(`/${process.env.CTP_PROJECT_KEY}/discount-codes`, { params });
    return resp.data;
  }
}

export default PromocodeAPI;
