import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AddressInfo = {
  key: string;
  street: string;
  city: string;
  postalCode: string;
  country: 'US' | 'CA';
};

type AddressesState = {
  addresses: AddressInfo[];
  billing: AddressInfo | null;
  shipping: AddressInfo | null;
};

type SetType = {
  info: AddressInfo;
  prevKey?: string;
};

type SetDefaultType = {
  key: string;
  checked: boolean;
  type: 'billing' | 'shipping';
};

const initialState: AddressesState = { addresses: [], billing: null, shipping: null };

export const regAdressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<SetType>) {
      const { info, prevKey } = action.payload;
      const prevAddress = state.addresses.find((address) => address.key === prevKey);
      const filtered = state.addresses.filter((address) => address.key !== info.key && address.key !== prevKey);
      return {
        ...state,
        addresses: [...filtered, info],
        billing: prevAddress && state.billing === prevAddress ? null : state.billing,
        shipping: prevAddress && state.shipping === prevAddress ? null : state.shipping,
      };
    },
    removeAddress(state, action: PayloadAction<string>) {
      const key = action.payload;
      const addressToDelete = state.addresses.find((address) => address.key === key);
      return {
        ...state,
        addresses: state.addresses.filter((address) => address !== addressToDelete),
        billing: addressToDelete && state.billing === addressToDelete ? null : state.billing,
        shipping: addressToDelete && state.shipping === addressToDelete ? null : state.shipping,
      };
    },
    setDefaultAddress(state, action: PayloadAction<SetDefaultType>) {
      const { key, checked, type } = action.payload;
      const newState = {
        ...state,
      };
      if (checked) {
        newState[type] = state.addresses.find((address) => address.key === key) ?? null;
      } else {
        newState[type] = null;
      }
      return newState;
    },
  },
});

export default regAdressesSlice.reducer;
