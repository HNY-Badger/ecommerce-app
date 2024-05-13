export type AddressData = {
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: 'US' | 'CA';
};

export type CustomerRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressData[];
  defaultShippingAddress?: number;
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
