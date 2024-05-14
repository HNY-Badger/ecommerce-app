export type CountryType = 'US' | 'CA';

export type AddressData = {
  id: string;
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: CountryType;
};

export type CustomerRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressData[];
  shippingAddresses: number[];
  defaultShippingAddress?: number;
  billingAddresses: number[];
  defaultBillingAddress?: number;
};

export type Customer = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressData[];
  billingAddressIds: string[];
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  defaultShippingAddressId: string;
};

export type CustomerResponse = {
  customer: Customer;
};
