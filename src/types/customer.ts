export type CountryType = 'US' | 'CA';

export type AddressData = {
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
  firstName: string;
  lastName: string;
  password: string;
};

export type CustomerResponse = {
  customer: Customer;
};
