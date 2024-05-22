import axios from 'axios';
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

export default api;
