import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import { store } from '../store/store';

// Use in case of useNavigate error
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('Registration email input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const input = screen.getByTestId('email-input');
  const emailTests = { email: `Email doesn't meet format`, 'test@gm': `Email doesn't meet format` };
  Object.entries(emailTests).forEach(([value, errorMessage]) => {
    fireEvent.change(input, { target: { value } });
    const error = screen.getByTestId('email-error');
    expect(input).toHaveValue(value);
    expect(error).toHaveTextContent(errorMessage);
  });
});

test('Registration password input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const input = screen.getByTestId('password-input');
  const passTests = {
    pass: `Password must be at least 8 characters long Password must contain at least one uppercase letter Password must contain at least one number`,
    '123': `Password must be at least 8 characters long Password must contain at least one uppercase letter Password must contain at least one lowercase letter`,
    Tes1: 'Password must be at least 8 characters long',
    '1A': 'Password must be at least 8 characters long Password must contain at least one lowercase letter',
  };
  Object.entries(passTests).forEach(([value, errorMessage]) => {
    fireEvent.change(input, { target: { value } });
    const error = screen.getByTestId('password-error');
    expect(input).toHaveValue(value);
    expect(error).toHaveTextContent(errorMessage);
  });
});

test('Registration first name input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const input = screen.getByTestId('first-name-input');
  const firstNameTests = {
    '123': `Only English letters or spaces are allowed`,
    '   ы   ': 'Only English letters or spaces are allowed',
  };
  Object.entries(firstNameTests).forEach(([value, errorMessage]) => {
    fireEvent.change(input, { target: { value } });
    const error = screen.getByTestId('first-name-error');
    expect(input).toHaveValue(value);
    expect(error).toHaveTextContent(errorMessage);
  });
});

test('Registration last name input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const input = screen.getByTestId('last-name-input');
  const lastNameTests = {
    '123': `Only English letters or spaces are allowed`,
    '   ы   ': 'Only English letters or spaces are allowed',
  };
  Object.entries(lastNameTests).forEach(([value, errorMessage]) => {
    fireEvent.change(input, { target: { value } });
    const error = screen.getByTestId('last-name-error');
    expect(input).toHaveValue(value);
    expect(error).toHaveTextContent(errorMessage);
  });
});

test('Registration date of birth input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const input = screen.getByTestId('date-of-birth-input');
  const dateOfBirthTests = {
    '2023-10-10': `You must be at least 13 years old`,
  };
  Object.entries(dateOfBirthTests).forEach(([value, errorMessage]) => {
    fireEvent.change(input, { target: { value } });
    const error = screen.getByTestId('date-of-birth-error');
    expect(input).toHaveValue(value);
    expect(error).toHaveTextContent(errorMessage);
  });
});

test('Modal window appears on add address click', () => {
  render(
    <Provider store={store}>
      <RegistrationPage />
    </Provider>
  );
  const button = screen.getByTestId('add-address');
  fireEvent.click(button);
  const modal = screen.getByTestId('address-modal');
  expect(modal).toBeVisible();
});
