import { AddressData } from './customer';

export type PersonalActions = 'changeEmail' | 'setFirstName' | 'setLastName' | 'setDateOfBirth';

export type PersonalBody<T extends PersonalActions> = T extends 'changeEmail'
  ? { email: string }
  : T extends 'setFirstName'
    ? { firstName: string }
    : T extends 'setLastName'
      ? { lastName: string }
      : T extends 'setDateOfBirth'
        ? { dateOfBirth: string }
        : never;

export type UpdatePersonal<T extends PersonalActions> = {
  action: T;
} & PersonalBody<T>;

export type UpdatePersonalParams = {
  id: string;
  data: {
    version: number;
    actions: UpdatePersonal<PersonalActions>[];
  };
};

export type AddressActions =
  | 'addAddress'
  | 'changeAddress'
  | 'removeAddress'
  | 'setDefaultShippingAddress'
  | 'addShippingAddressId'
  | 'removeShippingAddressId'
  | 'setDefaultBillingAddress'
  | 'addBillingAddressId'
  | 'removeBillingAddressId';

export type AddressBody<T extends AddressActions> = T extends 'addAddress' | 'changeAddress'
  ? { address: AddressData }
  : T extends Omit<AddressActions, 'addAddress' | 'changeAddress'>
    ? { addressKey: string | undefined }
    : never;

export type UpdateAddress<T extends AddressActions> = {
  action: T;
} & AddressBody<T>;

export type UpdateAddressParams = {
  id: string;
  data: {
    version: number;
    actions: UpdateAddress<AddressActions>[];
  };
};

export type UpdatePasswordParams = {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
};
