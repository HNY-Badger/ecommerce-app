export type InputType =
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'birthday'
  | 'street'
  | 'city'
  | 'postalCodeUS'
  | 'postalCodeCA';

export type InputState<T> = {
  value: T;
  error: string;
};