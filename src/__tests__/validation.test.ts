import Validation from '../data/Validation/validation';

test('Validation for Email works', () => {
  expect(Validation.checkValidity('test', 'email')).toBe(`Email doesn't meet format\n`);
  expect(Validation.checkValidity('test@gm.', 'email')).toBe(`Email doesn't meet format\n`);
  expect(Validation.checkValidity('test@.com', 'email')).toBe(`Email doesn't meet format\n`);
  expect(Validation.checkValidity('test@gmail.com', 'email')).toBe('');
});

test('Validation for Password', () => {
  expect(Validation.checkValidity('tR1', 'password')).toBe(`Password must be at least 8 characters long\n`);
  expect(Validation.checkValidity('testtest1', 'password')).toBe(
    `Password must contain at least one uppercase letter\n`
  );
  expect(Validation.checkValidity('TESTTEST1', 'password')).toBe(
    `Password must contain at least one lowercase letter\n`
  );
  expect(Validation.checkValidity('TESTtest', 'password')).toBe(`Password must contain at least one number\n`);
  expect(Validation.checkValidity('TestЬь1234!', 'password')).toBe(
    `Password can only contain:\n  - English letters (A-z)\n  - Numbers (0-9)\n  - Special characters (! @ # $ % ^ & *)\n`
  );
  expect(Validation.checkValidity('Test123!!', 'password')).toBe('');
  expect(Validation.checkValidity('Testtest1', 'password')).toBe('');
  expect(Validation.checkValidity('Tt1!@#$%^&*', 'password')).toBe('');
});

test('Validation for FirstName', () => {
  expect(Validation.checkValidity('', 'firstName')).toBe(`First name must contain at least one character\n`);
  expect(Validation.checkValidity('1', 'firstName')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Тест', 'firstName')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Test', 'firstName')).toBe('');
  expect(Validation.checkValidity('Te st', 'firstName')).toBe('');
  expect(Validation.checkValidity(' ', 'firstName')).toBe('');
});

test('Validation for LastName', () => {
  expect(Validation.checkValidity('', 'lastName')).toBe(`Last name must contain at least one character\n`);
  expect(Validation.checkValidity('1', 'lastName')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Тест', 'lastName')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Test', 'lastName')).toBe('');
  expect(Validation.checkValidity('Te st', 'lastName')).toBe('');
  expect(Validation.checkValidity(' ', 'lastName')).toBe('');
});

test('Validation for DdateOfBirth', () => {
  expect(Validation.checkValidity('01.01.2023', 'dateOfBirth')).toBe(`You must be at least 13 years old\n`);
  expect(Validation.checkValidity('01.01.2000', 'dateOfBirth')).toBe('');
});

test('Validation for StreetName', () => {
  expect(Validation.checkValidity('', 'streetName')).toBe(`Street must contain at least one character\n`);
  expect(Validation.checkValidity('1', 'streetName')).toBe('');
  expect(Validation.checkValidity('Ь', 'streetName')).toBe('');
  expect(Validation.checkValidity('ь', 'streetName')).toBe('');
  expect(Validation.checkValidity('T', 'streetName')).toBe('');
  expect(Validation.checkValidity('t', 'streetName')).toBe('');
  expect(Validation.checkValidity('Тест', 'streetName')).toBe('');
  expect(Validation.checkValidity('Test', 'streetName')).toBe('');
  expect(Validation.checkValidity('Te st', 'streetName')).toBe('');
  expect(Validation.checkValidity('Те ст 11', 'streetName')).toBe('');
  expect(Validation.checkValidity(' ', 'streetName')).toBe('');
});

test('Validation for City', () => {
  expect(Validation.checkValidity('', 'city')).toBe(`City must contain at least one character\n`);
  expect(Validation.checkValidity('1', 'city')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Ь', 'city')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('ь', 'city')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Тест', 'city')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('Те ст 11', 'city')).toBe(`Only English letters or spaces are allowed\n`);
  expect(Validation.checkValidity('T', 'city')).toBe('');
  expect(Validation.checkValidity('t', 'city')).toBe('');
  expect(Validation.checkValidity('Test', 'city')).toBe('');
  expect(Validation.checkValidity('Te st', 'city')).toBe('');
  expect(Validation.checkValidity(' ', 'city')).toBe('');
});

test('Validation for PostalCodeUS', () => {
  expect(Validation.checkValidity('12', 'postalCodeUS')).toBe(`Postal code doesn't meet U.S. format\n(e.g., 12345)\n`);
  expect(Validation.checkValidity('123456', 'postalCodeUS')).toBe(
    `Postal code doesn't meet U.S. format\n(e.g., 12345)\n`
  );
  expect(Validation.checkValidity('12345', 'postalCodeUS')).toBe('');
});

test('Validation for PostalCodeCA', () => {
  expect(Validation.checkValidity('a1B 2c3', 'postalCodeCA')).toBe(
    `Postal code doesn't meet Canada format\n(e.g., A1B 2C3)\n`
  );
  expect(Validation.checkValidity('A1B2C3', 'postalCodeCA')).toBe(
    `Postal code doesn't meet Canada format\n(e.g., A1B 2C3)\n`
  );
  expect(Validation.checkValidity('Ь1И 2Б3', 'postalCodeCA')).toBe(
    `Postal code doesn't meet Canada format\n(e.g., A1B 2C3)\n`
  );
  expect(Validation.checkValidity('A1B 2C3', 'postalCodeCA')).toBe('');
});
