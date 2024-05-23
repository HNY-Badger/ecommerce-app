import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Customer } from '../../types/customer';
import LocalStorage from '../localStorage';
import Cookie from '../cookie';

type CustomerState = { customer: Customer | null };

const initialState: CustomerState = {
  customer: LocalStorage.getItem('customer'),
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer(_, action: PayloadAction<Customer>) {
      LocalStorage.setItem('customer', action.payload);
      return { customer: action.payload };
    },
    deleteCustomer() {
      LocalStorage.removeItem('customer');
      Cookie.removeCookie('accessToken');
      Cookie.removeCookie('refreshToken');
      return { customer: null };
    },
  },
});

export const { setCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
