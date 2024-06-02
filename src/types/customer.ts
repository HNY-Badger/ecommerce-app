export type CountryType = 'US' | 'CA';

export type Address = {
  id: string;
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryType;
};

export type AddressData = Omit<Address, 'id'>;

type CustomerBaseInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type CustomerRegistrationData = CustomerBaseInfo & {
  addresses: AddressData[];
  shippingAddresses: number[];
  defaultShippingAddress?: number;
  billingAddresses: number[];
  defaultBillingAddress?: number;
};

export type Customer = CustomerBaseInfo & {
  id: string;
  version: number;
  addresses: Address[];
  billingAddressIds: string[];
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  defaultShippingAddressId: string;
};

export type CustomerResponse = {
  customer: Customer;
};

export type SpecialAddresses = {
  billingAddresses: string[];
  shippingAddresses: string[];
};

export type DefaultAddresses = {
  defaultBillingAddress?: string;
  defaultShippingAddress?: string;
};
