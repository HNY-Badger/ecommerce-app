import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from '../pages/LoginPage/LoginPage';
import { store } from '../store/store';

// Use in case of useNavigate error
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('Login email input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <LoginPage />
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

test('Login password input changes and displays the error', () => {
  render(
    <Provider store={store}>
      <LoginPage />
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

test('Clicking login with empty inputs should show an error', () => {
  render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  const button = screen.getByTestId('login-button');
  fireEvent.click(button);

  const emailInput = screen.getByTestId('email-input');
  const emailError = screen.getByTestId('email-error');
  expect(emailError).toHaveTextContent('Please fill out this field');

  fireEvent.change(emailInput, { target: { value: 'correct@gmail.com' } });
  fireEvent.click(button);
  const passwordError = screen.getByTestId('password-error');
  expect(passwordError).toHaveTextContent('Please fill out this field');
});
