export type AddressData = {
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: 'US' | 'CA';
};

export type UserRegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressData[];
  defaultShippingAddress: number;
  defaultBillingAddress: number;
};
